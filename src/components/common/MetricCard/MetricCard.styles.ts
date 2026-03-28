import { StyleSheet } from 'react-native';

import { color } from '../../../styles/appStyles';

export const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    minWidth: 132,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 4,
  },
  metricValue: {
    color: color.slate900,
    fontSize: 22,
    fontWeight: '700',
  },
  metricLabel: {
    color: color.slate500,
    fontSize: 12,
  },
});
