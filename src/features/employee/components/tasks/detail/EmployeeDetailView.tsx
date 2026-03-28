import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { PhotoReportPanel } from '../../../../../components/tasks/PhotoReportPanel';
import { TaskDetailsCard } from '../../../../../components/tasks/TaskDetailsCard';
import { Employee, Task, TaskStatus } from '../../../../../types/fieldOps';
import { styles } from './EmployeeDetailView.styles';

type EmployeeDetailViewProps = {
  activeEmployee: Employee;
  onBackToTasks: () => void;
  onSetTab: (tab: 'execute') => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  selectedTask: Task;
};

export const EmployeeDetailView: React.FC<EmployeeDetailViewProps> = ({
  activeEmployee,
  onBackToTasks,
  onSetTab,
  onUpdateTaskStatus,
  selectedTask,
}) => {
  return (
    <View style={styles.stackGap16}>
      <Pressable style={styles.backButton} onPress={onBackToTasks}>
        <Text style={styles.backButtonText}>← Назад к задачам</Text>
      </Pressable>

      <TaskDetailsCard task={selectedTask} employee={activeEmployee} />
      <PhotoReportPanel reports={selectedTask.photoReports} />

      <View style={styles.actionRowWrap}>
        {selectedTask.status === 'created' && (
          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              onUpdateTaskStatus(selectedTask.id, 'in_progress');
              onSetTab('execute');
            }}
          >
            <Text style={styles.primaryButtonText}>Перейти к выполнению</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
