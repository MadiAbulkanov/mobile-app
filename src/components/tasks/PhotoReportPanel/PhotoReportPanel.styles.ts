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
  panelTitle: {
    color: color.slate800,
    fontSize: 16,
    fontWeight: '700',
  },
  panelHint: {
    color: color.slate500,
    fontSize: 13,
    fontWeight: '600',
  },
  panelText: {
    color: color.slate600,
    fontSize: 14,
    lineHeight: 20,
  },
  photoScroll: {
    flexGrow: 0,
  },
  photoScrollContent: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 4,
  },
  photoCard: {
    width: 160,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 10,
    padding: 10,
    backgroundColor: color.white,
    gap: 4,
  },
  photoThumb: {
    height: 58,
    borderRadius: 8,
  },
  photoCardTitle: {
    color: color.slate800,
    fontSize: 13,
    fontWeight: '600',
  },
  photoCardText: {
    color: color.slate500,
    fontSize: 12,
    lineHeight: 16,
  },
});
