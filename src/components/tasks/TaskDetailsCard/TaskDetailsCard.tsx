import React from 'react';
import { Text, View } from 'react-native';

import { Employee, Task } from '../../../types/fieldOps';
import { formatDate } from '../../../utils/date';
import { DetailItem } from '../../common/DetailItem';
import { StatusChip } from '../../common/StatusChip';
import { styles } from './TaskDetailsCard.styles';

type TaskDetailsCardProps = {
  employee: Employee;
  task: Task;
};

export const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({ employee, task }) => {
  return (
    <View style={styles.panelCard}>
      <View style={styles.rowBetweenStart}>
        <View style={styles.flexOne}>
          <Text style={styles.detailTaskId}>{task.id}</Text>
          <Text style={styles.panelTitle}>{task.title}</Text>
          <Text style={styles.panelText}>{task.description}</Text>
        </View>
        <StatusChip status={task.status} />
      </View>

      <View style={styles.detailsGrid}>
        <DetailItem label="Дата и время" value={formatDate(task.created_at)} />
        <DetailItem label="Исполнитель" value={`${employee.name} · ${employee.role}`} />
      </View>
    </View>
  );
};
