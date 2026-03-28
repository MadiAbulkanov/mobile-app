import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { employeeBottomNavStyles as styles } from './EmployeeBottomNav.styles';
import { EmployeeTab } from '../../../../types/fieldOps';

type BottomTab = 'tasks' | 'history' | 'profile';

type EmployeeBottomNavProps = {
  activeTab: BottomTab;
  onSetTab: (tab: EmployeeTab) => void;
};

export const EmployeeBottomNav: React.FC<EmployeeBottomNavProps> = ({ activeTab, onSetTab }) => {
  return (
    <View style={styles.employeeBottomNavWrap}>
      <View style={styles.employeeBottomNav}>
        <Pressable
          style={[styles.employeeBottomNavItem, activeTab === 'tasks' && styles.employeeBottomNavItemActive]}
          onPress={() => onSetTab('tasks')}
        >
          <Text
            style={[styles.employeeBottomNavText, activeTab === 'tasks' && styles.employeeBottomNavTextActive]}
          >
            Задачи
          </Text>
        </Pressable>

        <Pressable
          style={[styles.employeeBottomNavItem, activeTab === 'history' && styles.employeeBottomNavItemActive]}
          onPress={() => onSetTab('history')}
        >
          <Text
            style={[
              styles.employeeBottomNavText,
              activeTab === 'history' && styles.employeeBottomNavTextActive,
            ]}
          >
            История
          </Text>
        </Pressable>

        <Pressable
          style={[styles.employeeBottomNavItem, activeTab === 'profile' && styles.employeeBottomNavItemActive]}
          onPress={() => onSetTab('profile')}
        >
          <Text
            style={[
              styles.employeeBottomNavText,
              activeTab === 'profile' && styles.employeeBottomNavTextActive,
            ]}
          >
            Профиль
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
