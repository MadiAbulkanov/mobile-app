import { StyleSheet } from 'react-native';

import { color } from '../../../styles/appStyles';

export const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  taskCardCompact: {
    paddingVertical: 12,
  },
  rowBetweenStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  taskCardHeading: {
    flex: 1,
    gap: 2,
    marginRight: 8,
  },
  taskCardTitle: {
    color: color.slate900,
    fontSize: 15,
    fontWeight: '700',
  },
  taskCardMeta: {
    color: color.slate500,
    fontSize: 12,
  },
  taskCardDescription: {
    color: color.slate600,
    fontSize: 13,
    lineHeight: 18,
  },
  actionRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
