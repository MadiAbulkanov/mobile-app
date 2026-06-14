import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';

import { ArrowIcon } from 'src/components/common/icons';

import { color } from '../../styles/appStyles';
import { OwnerOrdersTab, Task } from '../../types/fieldOps';

type OwnerAnalyticsScreenProps = {
  onLogout: () => void;
  onOpenOrders: (tab: OwnerOrdersTab) => void;
  tasks: Task[];
};

type MetricTile = {
  key: OwnerOrdersTab;
  label: string;
  value: number;
};

const parseDate = (raw: string) => {
  const trimmed = raw.trim();

  if (!trimmed) {
    return null;
  }

  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const OwnerAnalyticsScreen: React.FC<OwnerAnalyticsScreenProps> = ({
  onLogout,
  onOpenOrders,
  tasks,
}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const from = useMemo(() => parseDate(fromDate), [fromDate]);
  const to = useMemo(() => parseDate(toDate), [toDate]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const createdAt = new Date(task.created_at);

      if (Number.isNaN(createdAt.getTime())) {
        return false;
      }

      if (from && createdAt < from) {
        return false;
      }

      if (to) {
        const toDateEnd = new Date(to);
        toDateEnd.setHours(23, 59, 59, 999);

        if (createdAt > toDateEnd) {
          return false;
        }
      }

      return true;
    });
  }, [from, tasks, to]);

  const chartPoints = useMemo(() => {
    const now = new Date();
    const bucketMap = new Map<string, number>();

    for (let index = 6; index >= 0; index -= 1) {
      const day = new Date(now);
      day.setDate(day.getDate() - index);
      bucketMap.set(toDateKey(day), 0);
    }

    filteredTasks.forEach(task => {
      const createdAt = new Date(task.created_at);

      if (Number.isNaN(createdAt.getTime())) {
        return;
      }

      const key = toDateKey(createdAt);

      if (!bucketMap.has(key)) {
        return;
      }

      bucketMap.set(key, (bucketMap.get(key) ?? 0) + 1);
    });

    const points = [...bucketMap.entries()].map(([key, count]) => ({ key, count }));
    const max = Math.max(...points.map(point => point.count), 1);

    return points.map(point => ({
      ...point,
      height: Math.max(10, Math.round((point.count / max) * 120)),
    }));
  }, [filteredTasks]);

  const metrics = useMemo<MetricTile[]>(() => {
    const allOrders = filteredTasks.length;
    const inWork = filteredTasks.filter(task =>
      ['created', 'in_progress'].includes(task.status)
    ).length;
    const awaitingPayment = filteredTasks.filter(task => task.status === 'completed').length;

    const overdue = filteredTasks.filter(task => {
      const createdAt = new Date(task.created_at);

      if (Number.isNaN(createdAt.getTime())) {
        return false;
      }

      const diff = Date.now() - createdAt.getTime();
      const isOlderThanThreeDays = diff > 3 * 24 * 60 * 60 * 1000;
      return isOlderThanThreeDays && task.status !== 'completed';
    }).length;

    const materialsLow = 0;

    return [
      { key: 'all', label: 'Все заказы (за период)', value: allOrders },
      { key: 'inwork', label: 'В работе', value: inWork },
      { key: 'payment', label: 'Ожидают оплаты', value: awaitingPayment },
      { key: 'overdue', label: 'Просрочено', value: overdue },
      { key: 'materials', label: 'Материалы на исходе', value: materialsLow },
    ];
  }, [filteredTasks]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Название организации</Text>

      <Text style={{ fontSize: 20, fontWeight: 400 }}>Фильтрация по датам</Text>

      <View style={styles.chartCard}>
        <View style={styles.chartRow}>
          {chartPoints.map(point => (
            <View key={point.key} style={styles.chartBarWrap}>
              <View style={[styles.chartBar, { height: point.height }]} />
              <Text style={styles.chartLabel}>{point.key.slice(5)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.metricsWrap}>
        {metrics.map(metric => (
          <Pressable
            key={metric.key}
            style={styles.metricCard}
            onPress={() => onOpenOrders(metric.key)}
          >
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text
              style={[
                styles.metricValue,
                metric.key === 'overdue'
                  ? { color: color.red }
                  : metric.key === 'materials'
                    ? { color: '#FAA61A' }
                    : null,
              ]}
            >
              {metric.value}
            </Text>
            <View style={{ marginLeft: 12 }}>
              <ArrowIcon />
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Выйти из профиля</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    color: color.black,
    fontSize: 32,
    fontWeight: '400',
  },
  chartCard: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  cardTitle: {
    color: color.slate800,
    fontSize: 16,
    fontWeight: '700',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    minHeight: 150,
  },
  chartBarWrap: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  chartBar: {
    width: '100%',
    backgroundColor: color.blue600,
    borderRadius: 8,
  },
  chartLabel: {
    color: color.slate500,
    fontSize: 11,
  },
  filtersWrap: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  filterRow: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: color.white,
    color: color.slate900,
  },
  metricsWrap: {
    gap: 10,
  },
  metricCard: {
    backgroundColor: color.slate10,
    borderWidth: 1,
    borderColor: color.slate10,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    color: color.black,
    fontSize: 18,
    fontWeight: '400',
    flex: 1,
  },
  metricValue: {
    color: color.blue600,
    fontSize: 28,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 8,
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '400',
  },
});
