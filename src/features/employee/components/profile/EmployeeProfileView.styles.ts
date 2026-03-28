import { StyleSheet } from 'react-native';

const color = {
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  blue700: '#1D4ED8',
  white: '#FFFFFF',
};

export const employeeProfileViewStyles = StyleSheet.create({
  profileGrid: {
    gap: 14,
  },
  profileGridWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  profileName: {
    color: color.white,
    fontSize: 26,
    fontWeight: '800',
  },
  profileRole: {
    color: '#BFDBFE',
    fontSize: 15,
    fontWeight: '700',
  },
  profileMeta: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
  panelCardAccentStrong: {
    backgroundColor: color.slate900,
    borderRadius: 24,
    padding: 18,
    gap: 10,
  },
  stackGap16: {
    gap: 16,
  },
  panelCard: {
    backgroundColor: color.white,
    borderRadius: 24,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: color.slate200,
  },
  panelTitle: {
    color: color.slate900,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  panelText: {
    color: color.slate600,
    fontSize: 14,
    lineHeight: 20,
  },
  ghostButton: {
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: color.slate300,
    alignSelf: 'center',
    backgroundColor: color.blue500,
  },
  ghostButtonText: {
    color: color.slate50,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
