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
   createButton: {
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  createButtonText: {
    color: color.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButton: {
    width: '100%',
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
  tableCard: {
    backgroundColor: color.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: color.slate200,
    overflow: 'hidden',
  },
  filterBarSimple: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.slate200,
  },
  searchInputWide: {
    flexGrow: 1,
    minWidth: 180,
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: color.slate900,
  },
  taskListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.slate100,
  },
  taskListItemActive: {
    backgroundColor: color.slate50,
  },
  flexOne: {
    flex: 1,
  },
  tableCellTitle: {
    color: color.slate900,
    fontSize: 14,
    fontWeight: '600',
  },
  tableCellText: {
    color: color.slate600,
    fontSize: 13,
    lineHeight: 18,
  },
  emptyStateBlock: {
    padding: 16,
  },
  panelText: {
    color: color.slate600,
    fontSize: 14,
    lineHeight: 20,
  },
  panelTitle: {
    color: color.slate800,
    fontSize: 16,
    fontWeight: '700',
  },
  rowBetweenStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.42)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    maxHeight: '92%',
    backgroundColor: color.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: color.slate200,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.slate200,
  },
  modalCloseButton: {
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: color.white,
  },
  modalCloseButtonText: {
    color: color.slate700,
    fontSize: 13,
    fontWeight: '600',
  },
  modalCloseIcon: {
    color: color.slate700,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20,
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalScrollContent: {
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  optionPill: {
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: color.white,
  },
  optionPillActive: {
    borderColor: color.blue600,
    backgroundColor: color.slate50,
  },
  optionPillText: {
    color: color.slate700,
    fontSize: 13,
    fontWeight: '500',
  },
  optionPillTextActive: {
    color: color.blue700,
    fontWeight: '600',
  },
  actionRowWrap: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  secondaryButton: {
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
  },
});
