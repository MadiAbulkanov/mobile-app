import React from 'react';
import { Text, View } from 'react-native';

import { MetricCard } from '../../../../components/common/MetricCard';
import { MetricSummary } from '../../../../types/fieldOps';
import { styles } from './ManagerDashboardTab.styles';

const CHART_BARS = [35, 50, 45, 65, 55, 60, 72, 68, 80, 76, 90, 100];
const CHART_MAX_H = 80;

const ACTIVITY = [
  { text: 'Иван завершил задачу «Замена датчика»', time: '2 мин назад' },
  { text: 'Мария приняла задачу «Пусконаладка счетчика»', time: '18 мин назад' },
  { text: 'Создана новая задача «Осмотр вентиляции»', time: '1 ч назад' },
];

type ManagerDashboardTabProps = {
  isTablet: boolean;
  metrics: MetricSummary;
};

export const ManagerDashboardTab: React.FC<ManagerDashboardTabProps> = ({ isTablet, metrics }) => {
  return (
    <View style={styles.stackGap16}>
      <View style={styles.managerContentHeader}>
        <Text style={styles.managerContentTitle}>Статистика</Text>
      </View>

      <View style={[styles.metricRow, isTablet && styles.metricRowWide]}>
        <MetricCard value={String(metrics.total)} label="Активные задачи" />
        <MetricCard value={String(metrics.inProgress)} label="В работе" />
        <MetricCard value={String(metrics.completed)} label="Завершено сегодня" />
        <MetricCard value="0" label="Просрочено" />
      </View>

      <View style={[styles.dashboardTwoCol, isTablet && styles.dashboardTwoColWide]}>
        <View style={[styles.chartCard, styles.dashboardChartBlock]}>
          <Text style={styles.panelTitle}>Динамика задач</Text>
          <View style={styles.chartBarsRow}>
            {CHART_BARS.map((height, index) => (
              <View
                key={index}
                style={[
                  styles.chartBar,
                  index >= CHART_BARS.length - 3 && styles.chartBarActive,
                  { height: Math.round((height / 100) * CHART_MAX_H) },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={[styles.activityCard, styles.dashboardActivityBlock]}>
          <Text style={styles.panelTitle}>Последние действия</Text>
          <View style={styles.stackGap12}>
            {ACTIVITY.map((item, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.flexOne}>
                  <Text style={styles.activityText}>{item.text}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
