import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { color } from '../../../../styles/appStyles';
import { Employee, Task } from '../../../../types/fieldOps';
import { styles } from './ManagerEmployeesTab.styles';

type ManagerEmployeesTabProps = {
  employees: Employee[];
  tasks: Task[];
};

export const ManagerEmployeesTab: React.FC<ManagerEmployeesTabProps> = ({ employees, tasks }) => {
  return (
    <View style={styles.stackGap16}>
      <View style={styles.managerContentHeader}>
        <Text style={styles.managerContentTitle}>Сотрудники</Text>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Добавить сотрудника</Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Поиск сотрудника"
        placeholderTextColor={color.slate400}
      />

      <View style={styles.empGrid}>
        {employees.map(employee => {
          const employeeTasks = tasks.filter(task => task.employeeId === employee.id);
          const activeCount = employeeTasks.filter(
            task => !['completed', 'cancelled', 'rescheduled'].includes(task.status)
          ).length;
          const doneCount = employeeTasks.filter(task => task.status === 'completed').length;

          return (
            <View key={employee.id} style={styles.empGridCard}>
              <View style={styles.empHeader}>
                <View style={styles.empAvatar}>
                  <Text style={styles.empAvatarText}>{employee.name.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.empGridName}>{employee.name}</Text>
                  <Text style={styles.empGridRole}>{employee.role}</Text>
                </View>
              </View>
              <Text style={styles.empGridStat}>
                Активных задач: <Text style={styles.empGridStatValue}>{activeCount}</Text>
              </Text>
              <Text style={styles.empGridStat}>
                Выполнено сегодня: <Text style={styles.empGridStatValue}>{doneCount}</Text>
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
