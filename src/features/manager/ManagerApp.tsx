import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { managerTabs } from '../../mocks/fieldOpsData';
import { styles } from './ManagerApp.styles';
import { Employee, ManagerTab, MetricSummary, Task } from '../../types/fieldOps';
import { ManagerCreateTaskTab } from './components/create';
import { ManagerDashboardTab } from './components/dashboard';
import { ManagerEmployeesTab } from './components/employees';
import { ManagerTasksTab } from './components/tasks';

type ManagerAppProps = {
  employees: Employee[];
  isDesktop: boolean;
  isTablet: boolean;
  managerTab: ManagerTab;
  metrics: MetricSummary;
  onLogout: () => void;
  onOpenTask: (taskId: string) => void;
  onSelectTab: (tab: ManagerTab) => void;
  onUpdateTask: (taskId: string, patch: Partial<Task>) => void;
  selectedTask?: Task;
  tasks: Task[];
};

export const ManagerApp: React.FC<ManagerAppProps> = ({
  employees,
  isDesktop,
  isTablet,
  managerTab,
  metrics,
  onLogout,
  onOpenTask,
  onSelectTab,
  onUpdateTask,
  selectedTask,
  tasks,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  const handleSelectTab = (tab: ManagerTab) => {
    onSelectTab(tab);

    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <View style={[styles.managerShell, isDesktop && styles.managerShellDesktop]}>
      <View style={styles.menuToggleWrap}>
        <Text style={styles.managerContentEyebrow}>Панель менеджера</Text>
        <Pressable style={styles.menuToggleButton} onPress={() => setIsSidebarOpen(prev => !prev)}>
          <Text style={styles.menuToggleIcon}>{isSidebarOpen ? '×' : '☰'}</Text>
        </Pressable>
      </View>

      {isSidebarOpen && (
        <View
          style={[
            styles.managerSidebar,
            isDesktop ? styles.managerSidebarDesktop : styles.managerSidebarCompact,
          ]}
        >
          <View style={styles.stackGap8}>
            {managerTabs.map(tab => {
              const active = managerTab === tab.key;

              return (
                <Pressable
                  key={tab.key}
                  onPress={() => handleSelectTab(tab.key)}
                  style={[styles.sidebarNavItem, active && styles.sidebarNavItemActive]}
                >
                  <Text style={[styles.sidebarNavText, active && styles.sidebarNavTextActive]}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable style={styles.ghostButtonDark} onPress={onLogout}>
            <Text style={styles.ghostButtonDarkText}>Выйти</Text>
          </Pressable>
        </View>
      )}

      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.managerContentScroll,
          !isSidebarOpen && styles.managerContentScrollMenuCollapsed,
        ]}
      >
        {managerTab === 'statistics' && (
          <ManagerDashboardTab isTablet={isTablet} metrics={metrics} />
        )}
        {managerTab === 'tasks' && (
          <ManagerTasksTab
            employees={employees}
            isTablet={isTablet}
            onOpenTask={onOpenTask}
            onSelectTab={() => onSelectTab('create')}
            onUpdateTask={onUpdateTask}
            selectedTask={selectedTask}
            tasks={tasks}
          />
        )}
        {managerTab === 'create' && (
          <ManagerCreateTaskTab
            employees={employees}
            isTablet={isTablet}
            onSelectTab={() => onSelectTab('tasks')}
          />
        )}
        {managerTab === 'employees' && <ManagerEmployeesTab employees={employees} tasks={tasks} />}
      </ScrollView>
    </View>
  );
};
