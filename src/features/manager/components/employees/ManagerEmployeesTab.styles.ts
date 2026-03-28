import { StyleSheet } from 'react-native';

import { color } from '../../../../styles/appStyles';

export const styles = StyleSheet.create({
  stackGap16: {
    gap: 16,
  },
  managerContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  managerContentTitle: {
    color: color.slate900,
    fontSize: 26,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: color.white,
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: color.slate900,
    backgroundColor: color.white,
  },
  empGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  empGridCard: {
    width: '100%',
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  empHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  empAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.blue600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empAvatarText: {
    color: color.white,
    fontSize: 18,
    fontWeight: '700',
  },
  empGridName: {
    color: color.slate900,
    fontSize: 16,
    fontWeight: '700',
  },
  empGridRole: {
    color: color.slate500,
    fontSize: 13,
  },
  empGridStat: {
    color: color.slate700,
    fontSize: 13,
  },
  empGridStatValue: {
    color: color.slate900,
    fontWeight: '700',
  },
});
