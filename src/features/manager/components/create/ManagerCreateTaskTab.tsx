import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { CreateTaskForm, Employee, Task } from '../../../../types/fieldOps';
import { normalizeScheduledAt } from 'src/utils/date';
import { styles } from './ManagerCreateTaskTab.styles';

export const defaultCreateForm: CreateTaskForm = {
  title: '',
  description: 'Кратко опишите фронт работ и ожидаемый результат.',
  created_at: '',
  employeeId: '',
};

type ManagerCreateTaskTabProps = {
  employees: Employee[];
  isTablet: boolean;
  onSelectTab: (tab: 'tasks') => void;
};

export const ManagerCreateTaskTab: React.FC<ManagerCreateTaskTabProps> = ({
  employees,
  isTablet,
  onSelectTab,
}) => {
  const [createForm, setCreateForm] = useState<CreateTaskForm>(defaultCreateForm);

  const updateCreateForm = (patch: Partial<CreateTaskForm>) => {
    setCreateForm(currentForm => ({ ...currentForm, ...patch }));
  };

  const createTask = () => {
    const newTask: Partial<Task> = {
      title: createForm.title,
      description: createForm.description,
      created_at: normalizeScheduledAt(createForm.created_at),
      employeeId: createForm.employeeId,
      status: 'created',
      photoReports: [],
    };
    setCreateForm(defaultCreateForm);
    onSelectTab('tasks');
  };

  return (
    <View style={styles.stackGap16}>
      <View style={styles.managerContentHeader}>
        <Text style={styles.managerContentTitle}>Создание задачи</Text>
      </View>

      <View style={styles.panelCard}>
        <View style={[styles.createFormGrid, isTablet && styles.createFormGridWide]}>
          <View style={styles.createFormField}>
            <Text style={styles.inputLabel}>Название задачи</Text>
            <TextInput
              style={styles.textInput}
              value={createForm.title}
              onChangeText={text => updateCreateForm({ title: text })}
            />
          </View>
          <View style={styles.createFormField}>
            <Text style={styles.inputLabel}>Дата</Text>
            <TextInput
              style={styles.textInput}
              value={createForm.created_at.split('T')[0] ?? ''}
              onChangeText={date =>
                updateCreateForm({
                  created_at: date + 'T' + (createForm.created_at.split('T')[1] ?? '10:00'),
                })
              }
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>Описание работ</Text>
        <TextInput
          multiline
          style={[styles.textInput, styles.textInputMultiline]}
          value={createForm.description}
          onChangeText={text => updateCreateForm({ description: text })}
        />

        <Text style={styles.inputLabel}>Назначить сотрудника</Text>
        <View style={styles.segmentList}>
          {employees.map(employee => {
            const active = createForm.employeeId === employee.id;

            return (
              <Pressable
                key={employee.id}
                onPress={() => updateCreateForm({ employeeId: employee.id })}
                style={[styles.segmentItem, active && styles.segmentItemActive]}
              >
                <Text style={[styles.segmentTitle, active && styles.segmentTitleActive]}>
                  {employee.name}
                </Text>
                <Text style={[styles.segmentCaption, active && styles.segmentCaptionActive]}>
                  {employee.role}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.actionRowWrap}>
          <Pressable style={styles.secondaryButton} onPress={() => onSelectTab('tasks')}>
            <Text style={styles.secondaryButtonText}>Отмена</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={createTask}>
            <Text style={styles.primaryButtonText}>Создать задачу</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
