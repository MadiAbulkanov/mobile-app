import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { StatusChip } from '../../../../components/common/StatusChip';
import { PhotoReportPanel } from '../../../../components/tasks/PhotoReportPanel';
import { statusMeta } from '../../../../mocks/fieldOpsData';
import { color } from '../../../../styles/appStyles';
import { Employee, Task, TaskStatus } from '../../../../types/fieldOps';
import { formatDate } from '../../../../utils/date';
import { styles } from './ManagerTasksTab.styles';

const taskStatusOptions = Object.keys(statusMeta) as TaskStatus[];

type ManagerTasksTabProps = {
  employees: Employee[];
  isTablet: boolean;
  onOpenTask: (taskId: string) => void;
  onSelectTab: (tab: 'create') => void;
  onUpdateTask: (taskId: string, patch: Partial<Task>) => void;
  selectedTask?: Task;
  tasks: Task[];
};

export const ManagerTasksTab: React.FC<ManagerTasksTabProps> = ({
  employees,
  isTablet,
  onOpenTask,
  onSelectTab,
  onUpdateTask,
  selectedTask,
  tasks,
}) => {
  const [taskSearch, setTaskSearch] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskDraft, setTaskDraft] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    employeeId: employees[0]?.id ?? '',
    status: 'created' as TaskStatus,
  });

  useEffect(() => {
    if (!selectedTask) {
      return;
    }

    const [date = '', time = ''] = selectedTask.created_at.split('T');

    setTaskDraft({
      title: selectedTask.title,
      description: selectedTask.description,
      date,
      time,
      employeeId: selectedTask.employeeId,
      status: selectedTask.status,
    });
  }, [selectedTask]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = taskSearch.trim().toLowerCase();

    if (!normalizedQuery) {
      return tasks;
    }

    return tasks.filter(task => {
      const employeeName = employees.find(item => item.id === task.employeeId)?.name ?? '';

      return [task.title, employeeName].join(' ').toLowerCase().includes(normalizedQuery);
    });
  }, [employees, taskSearch, tasks]);

  const resetTaskDraft = () => {
    if (!selectedTask) {
      return;
    }

    const [date = '', time = ''] = selectedTask.created_at.split('T');

    setTaskDraft({
      title: selectedTask.title,
      description: selectedTask.description,
      date,
      time,
      employeeId: selectedTask.employeeId,
      status: selectedTask.status,
    });
  };

  const handleSaveTask = () => {
    if (!selectedTask) {
      return;
    }

    onUpdateTask(selectedTask.id, {
      title: taskDraft.title,
      description: taskDraft.description,
      created_at: `${taskDraft.date}T${taskDraft.time}`,
      employeeId: taskDraft.employeeId,
      status: taskDraft.status,
    });

    setIsTaskModalOpen(false);
  };

  const handleOpenTask = (taskId: string) => {
    onOpenTask(taskId);
    setIsTaskModalOpen(true);
  };

  return (
    <View style={styles.stackGap16}>
      <View style={styles.managerContentHeader}>
        <Text style={styles.managerContentTitle}>Список задач</Text>
        <Pressable style={styles.createButton} onPress={() => onSelectTab('create')}>
          <Text style={styles.createButtonText}>Создать задачу</Text>
        </Pressable>
      </View>

      <View style={styles.tableCard}>
        <View style={styles.filterBarSimple}>
          <TextInput
            style={styles.searchInputWide}
            placeholder="Поиск по задаче или адресу"
            placeholderTextColor={color.slate400}
            value={taskSearch}
            onChangeText={setTaskSearch}
          />
        </View>

        {filteredTasks.map(task => {
          const employee = employees.find(item => item.id === task.employeeId) ?? employees[0];
          const active = selectedTask?.id === task.id;

          return (
            <Pressable
              key={task.id}
              style={[styles.taskListItem, active && styles.taskListItemActive]}
              onPress={() => handleOpenTask(task.id)}
            >
              <View style={styles.flexOne}>
                <Text style={styles.tableCellTitle}>{task.title}</Text>
                <Text style={styles.tableCellText}>{employee.name}</Text>
                <Text style={styles.tableCellText}>{formatDate(task.created_at)}</Text>
              </View>
              <StatusChip status={task.status} />
            </Pressable>
          );
        })}

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyStateBlock}>
            <Text style={styles.panelText}>По вашему запросу задачи не найдены.</Text>
          </View>
        ) : null}
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={isTaskModalOpen && Boolean(selectedTask)}
        onRequestClose={() => setIsTaskModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedTask ? (
              <>
                <View style={styles.modalHeader}>
                  <Pressable
                    style={styles.modalCloseButton}
                    onPress={() => setIsTaskModalOpen(false)}
                  >
                    <Text style={styles.modalCloseIcon}>×</Text>
                  </Pressable>
                </View>

                <ScrollView
                  style={styles.modalScroll}
                  contentContainerStyle={styles.modalScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.rowBetweenStart}>
                    <View style={styles.flexOne}>
                      <Text style={styles.panelText}>ID: {selectedTask.id}</Text>
                    </View>
                    <StatusChip status={taskDraft.status} />
                  </View>

                  <View style={[styles.createFormGrid, isTablet && styles.createFormGridWide]}>
                    <View style={styles.createFormField}>
                      <Text style={styles.inputLabel}>Название задачи</Text>
                      <TextInput
                        style={styles.textInput}
                        value={taskDraft.title}
                        onChangeText={text =>
                          setTaskDraft(current => ({ ...current, title: text }))
                        }
                      />
                    </View>
                    <View style={styles.createFormField}>
                      <Text style={styles.inputLabel}>Дата</Text>
                      <TextInput
                        style={styles.textInput}
                        value={taskDraft.date}
                        onChangeText={text => setTaskDraft(current => ({ ...current, date: text }))}
                      />
                    </View>
                  </View>

                  <Text style={styles.inputLabel}>Описание работ</Text>
                  <TextInput
                    multiline
                    style={[styles.textInput, styles.textInputMultiline]}
                    value={taskDraft.description}
                    onChangeText={text =>
                      setTaskDraft(current => ({ ...current, description: text }))
                    }
                  />

                  <Text style={styles.inputLabel}>Сотрудник</Text>
                  <View style={styles.segmentList}>
                    {employees.map(employee => {
                      const active = taskDraft.employeeId === employee.id;

                      return (
                        <Pressable
                          key={employee.id}
                          onPress={() =>
                            setTaskDraft(current => ({ ...current, employeeId: employee.id }))
                          }
                          style={[styles.segmentItem, active && styles.segmentItemActive]}
                        >
                          <Text style={[styles.segmentTitle, active && styles.segmentTitleActive]}>
                            {employee.name}
                          </Text>
                          <Text
                            style={[styles.segmentCaption, active && styles.segmentCaptionActive]}
                          >
                            {employee.role}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <Text style={styles.inputLabel}>Статус</Text>
                  <View style={styles.segmentList}>
                    {taskStatusOptions.map(status => {
                      const active = taskDraft.status === status;

                      return (
                        <Pressable
                          key={status}
                          onPress={() => setTaskDraft(current => ({ ...current, status }))}
                          style={[styles.optionPill, active && styles.optionPillActive]}
                        >
                          <Text
                            style={[styles.optionPillText, active && styles.optionPillTextActive]}
                          >
                            {statusMeta[status].label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <View style={styles.actionRowWrap}>
                    <Pressable style={styles.primaryButton} onPress={handleSaveTask}>
                      <Text style={styles.primaryButtonText}>Сохранить изменения</Text>
                    </Pressable>
                  </View>

                  <PhotoReportPanel reports={selectedTask.photoReports} />
                </ScrollView>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};
