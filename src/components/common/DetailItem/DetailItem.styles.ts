import { StyleSheet } from 'react-native';

import { color } from '../../../styles/appStyles';

export const styles = StyleSheet.create({
  detailItem: {
    backgroundColor: color.slate50,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 4,
  },
  detailLabel: {
    color: color.slate500,
    fontSize: 12,
  },
  detailValue: {
    color: color.slate800,
    fontSize: 14,
    fontWeight: '600',
  },
});
