import { startTransition, useMemo, useState } from 'react';

import { initialTasks, photoReportAccents } from '../mocks/fieldOpsData';
import { ManagerTab, MetricSummary, Role, Task, TaskStatus } from '../types/fieldOps';

export const useFieldOpsState = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [role, setRole] = useState<Role | null>(null);
  const [managerTab, setManagerTab] = useState<ManagerTab>('statistics');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(initialTasks[0].id);

  const selectedTask = useMemo(
    () => tasks.find(task => task.id === selectedTaskId) ?? tasks[0],
    [selectedTaskId, tasks]
  );

  const metrics = useMemo<MetricSummary>(() => {
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const reports = tasks.reduce((total, task) => total + task.photoReports.length, 0);

    return {
      total: tasks.length,
      completed,
      inProgress,
      reports,
    };
  }, [tasks]);

  const openTask = (taskId: string) => {
    startTransition(() => {
      setSelectedTaskId(taskId);
    });
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const updateTask = (taskId: string, patch: Partial<Task>) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === taskId ? { ...task, ...patch } : task))
    );
  };

  const appendComment = (taskId: string, comment: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === taskId ? { ...task, comment } : task))
    );
  };

  const attachPhoto = (taskId: string) => {
    const time = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          photoReports: [
            ...task.photoReports,
            {
              id: `${task.id}-${task.photoReports.length + 1}`,
              label: `Фотоотчёт ${task.photoReports.length + 1}`,
              time,
              note: 'Добавлено с мобильного устройства сотрудника.',
              accent: photoReportAccents[task.photoReports.length % photoReportAccents.length],
            },
          ],
        };
      })
    );
  };

  return {
    state: {
      role,
      managerTab,
      tasks,
      selectedTask,
      metrics,
    },
    actions: {
      setRole,
      setManagerTab,
      openTask,
      updateTask,
      updateTaskStatus,
      appendComment,
      attachPhoto,
    },
  };
};
