import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Employee, Task } from '../../../types/fieldOps';
import { formatDate } from '../../../utils/date';
import { MetaChip } from '../../common/MetaChip';
import { StatusChip } from '../../common/StatusChip';
import { styles } from './TaskCard.styles';

type TaskCardProps = {
  compact?: boolean;
  employee: Employee;
  onPress: () => void;
  task: Task;
};

export const TaskCard: React.FC<TaskCardProps> = ({ compact = false, employee, onPress, task }) => {
  return (
    <Pressable onPress={onPress} style={[styles.taskCard, compact && styles.taskCardCompact]}>
      <View style={styles.rowBetweenStart}>
        <View style={styles.taskCardHeading}>
          <Text style={styles.taskCardTitle}>{task.title}</Text>
          <Text style={styles.taskCardMeta}>{formatDate(task.created_at)}</Text>
        </View>
        <StatusChip status={task.status} />
      </View>

      <Text style={styles.taskCardDescription}>{task.description}</Text>

      <View style={styles.actionRowWrap}>
        <MetaChip label={employee.name} color="#0F172A" tint="#E2E8F0" />
      </View>
    </Pressable>
  );
};
