import React from 'react';
import { Text, View } from 'react-native';

import { employeeSummaryHeaderStyles as styles } from './EmployeeSummaryHeader.styles';
import { Employee, Task } from '../../../../types/fieldOps';

type EmployeeSummaryHeaderProps = {
  activeEmployee: Employee;
  isDesktop: boolean;
  todayTasksDisplay: Task[];
};

export const EmployeeSummaryHeader: React.FC<EmployeeSummaryHeaderProps> = ({
  activeEmployee,
  isDesktop,
  todayTasksDisplay,
}) => {
  const taskCountLabel = `${todayTasksDisplay.length} задач${todayTasksDisplay.length === 1 ? 'а' : todayTasksDisplay.length >= 2 && todayTasksDisplay.length <= 4 ? 'и' : ''} на сегодня`;
  return (
    <View style={[styles.pageHeader, isDesktop && styles.pageHeaderDesktop]}>
      <View>
        <Text style={styles.pageTitle}>Доброе утро, {activeEmployee.name.split(' ')[0]}</Text>
        <Text style={styles.pageSubtitle}>{taskCountLabel}.</Text>
      </View>
    </View>
  );
};
