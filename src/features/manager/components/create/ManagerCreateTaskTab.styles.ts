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
  managerContentEyebrow: {
    color: color.slate500,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  managerContentTitle: {
    color: color.slate900,
    fontSize: 26,
    fontWeight: '700',
  },
  panelCard: {
    backgroundColor: color.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: color.slate200,
    padding: 16,
    gap: 12,
  },
  createFormGrid: {
    gap: 12,
  },
  createFormGridWide: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  createFormField: {
    flex: 1,
    gap: 6,
  },
  inputLabel: {
    color: color.slate600,
    fontSize: 13,
    marginBottom: 6,
    marginTop: 4,
    fontWeight: '500',
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
  textInputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  segmentList: {
    gap: 10,
  },
  segmentItem: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: color.white,
  },
  segmentItemActive: {
    borderColor: color.blue600,
    backgroundColor: color.slate50,
  },
  segmentTitle: {
    color: color.slate800,
    fontSize: 14,
    fontWeight: '600',
  },
  segmentTitleActive: {
    color: color.blue700,
  },
  segmentCaption: {
    color: color.slate500,
    fontSize: 12,
    marginTop: 2,
  },
  segmentCaptionActive: {
    color: color.blue600,
  },
  actionRowWrap: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  secondaryButton: {
    width: '48%',
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: color.white,
  },
  secondaryButtonText: {
    color: color.slate700,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButton: {
    width: '48%',
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: color.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
