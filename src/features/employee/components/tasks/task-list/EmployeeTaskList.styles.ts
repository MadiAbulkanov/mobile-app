import { StyleSheet } from 'react-native';

import { color } from '../../../../../styles/appStyles';

export const styles = StyleSheet.create({
  stackGap16: {
    gap: 16,
  },
  emptyStateCard: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  emptyStateTitle: {
    color: color.slate900,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyStateText: {
    color: color.slate600,
    fontSize: 14,
    lineHeight: 20,
  },
});
