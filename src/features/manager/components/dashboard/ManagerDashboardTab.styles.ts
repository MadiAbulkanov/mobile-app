import { StyleSheet } from 'react-native';

import { color } from '../../../../styles/appStyles';

const CHART_MAX_H = 80;

export const styles = StyleSheet.create({
  stackGap12: {
    gap: 12,
  },
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
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricRowWide: {
    flexWrap: 'nowrap',
  },
  dashboardTwoCol: {
    gap: 12,
  },
  dashboardTwoColWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  chartCard: {
    backgroundColor: color.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: color.slate200,
    padding: 16,
  },
  dashboardChartBlock: {
    flex: 2,
  },
  panelTitle: {
    color: color.slate800,
    fontSize: 16,
    fontWeight: '700',
  },
  chartBarsRow: {
    height: CHART_MAX_H,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  chartBar: {
    flex: 1,
    backgroundColor: color.slate300,
    borderRadius: 6,
  },
  chartBarActive: {
    backgroundColor: color.blue600,
  },
  activityCard: {
    backgroundColor: color.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: color.slate200,
    padding: 16,
  },
  dashboardActivityBlock: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: color.blue500,
    marginTop: 6,
  },
  flexOne: {
    flex: 1,
  },
  activityText: {
    color: color.slate800,
    fontSize: 14,
    lineHeight: 20,
  },
  activityTime: {
    color: color.slate500,
    fontSize: 12,
    marginTop: 2,
  },
});
