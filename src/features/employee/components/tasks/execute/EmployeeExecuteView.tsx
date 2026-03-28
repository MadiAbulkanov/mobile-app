import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { PhotoReportPanel } from '../../../../../components/tasks/PhotoReportPanel';
import { TaskDetailsCard } from '../../../../../components/tasks/TaskDetailsCard';
import { Employee, Task, TaskStatus } from '../../../../../types/fieldOps';
import { styles } from './EmployeeExecuteView.styles';

type EmployeeExecuteViewProps = {
  activeEmployee: Employee;
  onBackToTasks: () => void;
  onCompleteAndReturnToTasks: () => void;
  onAppendComment: (taskId: string, comment: string) => void;
  onAttachPhoto: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  selectedTask: Task;
  isTablet: boolean;
};

export const EmployeeExecuteView: React.FC<EmployeeExecuteViewProps> = ({
  activeEmployee,
  onBackToTasks,
  onCompleteAndReturnToTasks,
  onAppendComment,
  onAttachPhoto,
  onUpdateTaskStatus,
  selectedTask,
  isTablet,
}) => {
  const [draftComment, setDraftComment] = useState(
    'Прибыл на объект, начинаю диагностику по чек-листу.'
  );

  return (
    <View style={styles.stackGap16}>
      <Pressable style={styles.backButton} onPress={onBackToTasks}>
        <Text style={styles.backButtonText}>← Назад к задачам</Text>
      </Pressable>

      <View style={[styles.executeLayout, isTablet && styles.executeLayoutWide]}>
        <View style={styles.executeMain}>
          <TaskDetailsCard task={selectedTask} employee={activeEmployee} />
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>Комментарии по выполнению</Text>
            <TextInput
              multiline
              onChangeText={setDraftComment}
              style={[styles.textInput, styles.textInputMultiline]}
              value={draftComment}
            />
            <View style={styles.actionColumn}>
              <Pressable
                style={styles.secondaryButton}
                onPress={() => onAttachPhoto(selectedTask.id)}
              >
                <Text style={styles.secondaryButtonText}>Добавить фото</Text>
              </Pressable>
              <Pressable
                style={styles.primaryButton}
                onPress={() => onAppendComment(selectedTask.id, draftComment)}
              >
                <Text style={styles.primaryButtonText}>Сохранить комментарий</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.executeSide}>
          <View style={styles.panelCardAccent}>
            <Text style={styles.panelTitle}>Управление статусом</Text>
            <Text style={styles.panelText}>
              Фиксируйте прогресс на объекте, чтобы менеджер видел этапы без звонка.
            </Text>
            <View style={styles.stackGap12}>
              {selectedTask.status === 'created' && (
                <Pressable
                  style={styles.primaryButton}
                  onPress={() => onUpdateTaskStatus(selectedTask.id, 'in_progress')}
                >
                  <Text style={styles.primaryButtonText}>Начать выполнение</Text>
                </Pressable>
              )}
              {selectedTask.status === 'in_progress' && (
                <Pressable
                  style={styles.primaryButton}
                  onPress={() => {
                    onUpdateTaskStatus(selectedTask.id, 'completed');
                    onCompleteAndReturnToTasks();
                  }}
                >
                  <Text style={styles.primaryButtonText}>Завершить работу</Text>
                </Pressable>
              )}
            </View>
          </View>

          <PhotoReportPanel reports={selectedTask.photoReports} />
        </View>
      </View>
    </View>
  );
};
