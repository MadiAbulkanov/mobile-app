import React from 'react';
import { Text, View } from 'react-native';

import { TaskCard } from '../../../../../components/tasks/TaskCard';
import { Employee, Task } from '../../../../../types/fieldOps';
import { styles } from './EmployeeTaskList.styles';

type EmployeeTaskListProps = {
  activeEmployee: Employee;
  compact: boolean;
  onOpenTask: (taskId: string) => void;
  tasks: Task[];
};

export const EmployeeTaskList: React.FC<EmployeeTaskListProps> = ({
  activeEmployee,
  compact,
  onOpenTask,
  tasks,
}) => {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyStateCard}>
        <Text style={styles.emptyStateTitle}>Пока нет задач</Text>
        <Text style={styles.emptyStateText}>Для этого раздела сейчас нет данных.</Text>
      </View>
    );
  }

  return (
    <View style={styles.stackGap16}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          compact={compact}
          employee={activeEmployee}
          onPress={() => onOpenTask(task.id)}
          task={task}
        />
      ))}
    </View>
  );
};
