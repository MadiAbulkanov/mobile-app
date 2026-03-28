import { StyleSheet } from 'react-native';

import { color } from '../../../styles/appStyles';

export const styles = StyleSheet.create({
  panelCard: {
    backgroundColor: color.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: color.slate200,
    padding: 16,
    gap: 12,
  },
  rowBetweenStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  flexOne: {
    flex: 1,
  },
  detailTaskId: {
    color: color.slate500,
    fontSize: 12,
    marginBottom: 2,
  },
  panelTitle: {
    color: color.slate800,
    fontSize: 16,
    fontWeight: '700',
  },
  panelText: {
    color: color.slate600,
    fontSize: 14,
    lineHeight: 20,
  },
  detailsGrid: {
    gap: 10,
  },
});
