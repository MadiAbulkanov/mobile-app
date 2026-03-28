import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Employee, EmployeeTab, Task, TaskStatus } from '../../types/fieldOps';
import { EmployeeBottomNav } from './components/nav/EmployeeBottomNav';
import { EmployeeProfileView } from './components/profile/EmployeeProfileView';
import { EmployeeSummaryHeader } from './components/summary/EmployeeSummaryHeader';
import { EmployeeDetailView, EmployeeExecuteView, EmployeeTaskList } from './components/tasks';
import { styles } from './EmployeeApp.styles';
import { getLocalDateKey } from 'src/utils/date';
import { initialTasks } from 'src/mocks/fieldOpsData';

type EmployeeAppProps = {
  activeEmployee: Employee;
  isDesktop: boolean;
  isTablet: boolean;
  tasks: Task[];
  onAppendComment: (taskId: string, comment: string) => void;
  onAttachPhoto: (taskId: string) => void;
  onLogout: () => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
};

export const EmployeeApp: React.FC<EmployeeAppProps> = ({
  activeEmployee,
  isDesktop,
  isTablet,
  tasks,
  onAppendComment,
  onAttachPhoto,
  onLogout,
  onUpdateTaskStatus,
}) => {
  const todayKey = getLocalDateKey(new Date());
  const [employeeTab, setEmployeeTab] = useState<EmployeeTab>('tasks');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskSourceTab, setTaskSourceTab] = useState<'tasks' | 'history'>('tasks');

  const bottomTab: 'tasks' | 'history' | 'profile' =
    employeeTab === 'history' || employeeTab === 'profile'
      ? employeeTab
      : employeeTab === 'detail' || employeeTab === 'execute'
        ? taskSourceTab
        : 'tasks';

  const employeeTasks = useMemo(
    () => tasks.filter(task => task.employeeId === activeEmployee.id),
    [activeEmployee.id, tasks]
  );

  const todayTasks = useMemo(
    () =>
      employeeTasks.filter(
        task =>
          task.created_at.startsWith(todayKey) &&
          !['completed', 'cancelled', 'rescheduled'].includes(task.status)
      ),
    [employeeTasks, todayKey]
  );

  const historyTasks = useMemo(
    () =>
      employeeTasks.filter(task => ['completed', 'cancelled', 'rescheduled'].includes(task.status)),
    [employeeTasks]
  );

  const employeeMockTasks = useMemo(
    () => initialTasks.filter(task => task.employeeId === activeEmployee.id),
    [activeEmployee.id]
  );

  const todayTasksDisplay = useMemo(() => {
    if (todayTasks.length > 0) {
      return todayTasks;
    }

    return employeeMockTasks.filter(
      task => !['completed', 'cancelled', 'rescheduled'].includes(task.status)
    );
  }, [employeeMockTasks, todayTasks]);

  const historyTasksDisplay = useMemo(() => {
    if (historyTasks.length > 0) {
      return historyTasks;
    }

    return employeeMockTasks.filter(task =>
      ['completed', 'cancelled', 'rescheduled'].includes(task.status)
    );
  }, [employeeMockTasks, historyTasks]);

  const selectedTask = useMemo(
    () =>
      employeeTasks.find(task => task.id === selectedTaskId) ??
      todayTasksDisplay[0] ??
      historyTasksDisplay[0] ??
      employeeTasks[0],
    [employeeTasks, historyTasksDisplay, selectedTaskId, todayTasksDisplay]
  );

  useEffect(() => {
    if (!selectedTaskId && selectedTask) {
      setSelectedTaskId(selectedTask.id);
      return;
    }

    if (selectedTaskId && !employeeTasks.some(task => task.id === selectedTaskId)) {
      setSelectedTaskId(selectedTask?.id ?? null);
      setEmployeeTab('tasks');
    }
  }, [employeeTasks, selectedTask, selectedTaskId]);

  const handleOpenTask = (taskId: string, sourceTab: 'tasks' | 'history') => {
    const openedTask =
      employeeTasks.find(task => task.id === taskId) ??
      todayTasksDisplay.find(task => task.id === taskId) ??
      historyTasksDisplay.find(task => task.id === taskId);

    setTaskSourceTab(sourceTab);
    setSelectedTaskId(taskId);
    setEmployeeTab(openedTask?.status === 'in_progress' ? 'execute' : 'detail');
  };

  const handleSetTab = (tab: EmployeeTab) => {
    if (tab === 'tasks' || tab === 'history') {
      setTaskSourceTab(tab);
    }

    setEmployeeTab(tab);
  };

  return (
    <View style={styles.roleShell}>
      <ScrollView contentContainerStyle={styles.roleScrollContent} style={styles.screenScroll}>
        <EmployeeSummaryHeader
          activeEmployee={activeEmployee}
          isDesktop={isDesktop}
          todayTasksDisplay={todayTasksDisplay}
        />

        {employeeTab === 'tasks' && (
          <EmployeeTaskList
            activeEmployee={activeEmployee}
            compact={!isDesktop}
            onOpenTask={taskId => handleOpenTask(taskId, 'tasks')}
            tasks={todayTasksDisplay}
          />
        )}

        {employeeTab === 'detail' && selectedTask && (
          <EmployeeDetailView
            activeEmployee={activeEmployee}
            onBackToTasks={() => handleSetTab(taskSourceTab)}
            onSetTab={(tab: 'execute') => handleSetTab(tab)}
            onUpdateTaskStatus={onUpdateTaskStatus}
            selectedTask={selectedTask}
          />
        )}

        {employeeTab === 'execute' && selectedTask && (
          <EmployeeExecuteView
            activeEmployee={activeEmployee}
            isTablet={isTablet}
            onBackToTasks={() => handleSetTab(taskSourceTab)}
            onCompleteAndReturnToTasks={() => handleSetTab('tasks')}
            onAppendComment={onAppendComment}
            onAttachPhoto={onAttachPhoto}
            onUpdateTaskStatus={onUpdateTaskStatus}
            selectedTask={selectedTask}
          />
        )}

        {employeeTab === 'history' && (
          <EmployeeTaskList
            activeEmployee={activeEmployee}
            compact
            onOpenTask={taskId => handleOpenTask(taskId, 'history')}
            tasks={historyTasksDisplay}
          />
        )}

        {employeeTab === 'profile' && (
          <EmployeeProfileView
            activeEmployee={activeEmployee}
            isTablet={isTablet}
            onLogout={onLogout}
          />
        )}
      </ScrollView>

      <EmployeeBottomNav activeTab={bottomTab} onSetTab={handleSetTab} />
    </View>
  );
};
