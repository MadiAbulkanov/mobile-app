import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './MetricCard.styles';

type MetricCardProps = {
  label: string;
  value: string;
};

export const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
};
