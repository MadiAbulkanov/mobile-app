import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { MetricCard } from '../../../../components/common/MetricCard';
import { employeeProfileViewStyles as styles } from './EmployeeProfileView.styles';
import { Employee } from '../../../../types/fieldOps';

type EmployeeProfileViewProps = {
  activeEmployee: Employee;
  isTablet: boolean;
  onLogout: () => void;
};

export const EmployeeProfileView: React.FC<EmployeeProfileViewProps> = ({
  activeEmployee,
  isTablet,
  onLogout,
}) => {
  return (
    <View style={[styles.profileGrid, isTablet && styles.profileGridWide]}>
      <View style={styles.panelCardAccentStrong}>
        <Text style={styles.profileName}>{activeEmployee.name}</Text>
        <Text style={styles.profileRole}>{activeEmployee.role}</Text>
        <Text style={styles.profileMeta}>Телефон: {activeEmployee.phone}</Text>
      </View>
      <View style={[styles.stackGap16]}>
        <View style={styles.panelCard}>
          <Text style={styles.panelTitle}>Показатели</Text>
          <View style={styles.metricRow}>
            <MetricCard value={String(activeEmployee.completedTasks)} label="выполнено" />
            <MetricCard value={activeEmployee.rating.toFixed(1)} label="рейтинг" />
          </View>
        </View>
        <Pressable style={styles.ghostButton} onPress={onLogout}>
          <Text style={styles.ghostButtonText}>Выйти</Text>
        </Pressable>
      </View>
    </View>
  );
};
