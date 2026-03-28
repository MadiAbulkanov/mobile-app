import React from 'react';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { employees } from '../mocks/fieldOpsData';
import { appStyles as styles } from '../styles/appStyles';
import { AuthScreen } from '../features/auth/AuthScreen';
import { EmployeeApp } from '../features/employee/EmployeeApp';
import { ManagerApp } from '../features/manager';
import { useFieldOpsState } from '../hooks/useFieldOpsState';
import { ManagerTab } from '../types/fieldOps';

export const AppRoot: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1100;
  const isTablet = width >= 780;
  const { state, actions } = useFieldOpsState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        {state.role === null ? (
          <AuthScreen onSelectRole={actions.setRole} />
        ) : state.role === 'employee' ? (
          <EmployeeApp
            activeEmployee={employees[0]}
            isDesktop={isDesktop}
            isTablet={isTablet}
            tasks={state.tasks}
            onAppendComment={actions.appendComment}
            onAttachPhoto={actions.attachPhoto}
            onLogout={() => actions.setRole(null)}
            onUpdateTaskStatus={actions.updateTaskStatus}
          />
        ) : (
          <ManagerApp
            employees={employees}
            isDesktop={isDesktop}
            isTablet={isTablet}
            managerTab={state.managerTab}
            metrics={state.metrics}
            onLogout={() => actions.setRole(null)}
            onOpenTask={(taskId: string) => {
              actions.openTask(taskId);
              actions.setManagerTab('tasks' as ManagerTab);
            }}
            onSelectTab={actions.setManagerTab}
            onUpdateTask={actions.updateTask}
            selectedTask={state.selectedTask}
            tasks={state.tasks}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
