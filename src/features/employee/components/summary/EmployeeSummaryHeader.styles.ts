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

export const employeeSummaryHeaderStyles = StyleSheet.create({
  pageHeader: {
    gap: 12,
  },
  pageHeaderDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pageTitle: {
    color: color.slate900,
    fontSize: 26,
    lineHeight: 35,
    fontWeight: '800',
    paddingBottom: 20,
  },
  pageSubtitle: {
    color: color.slate600,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 760,
  },
  employeeHero: {
    gap: 14,
  },
  employeeHeroWide: {
    flexDirection: 'row',
  },
  employeeHeroMain: {
    flex: 1.25,
    backgroundColor: color.blue600,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: color.blue700,
  },
  employeeHeroSide: {
    flex: 0.75,
    gap: 10,
  },
  heroCardEyebrow: {
    color: '#BFDBFE',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  heroCardTitle: {
    color: color.white,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroCardText: {
    color: '#DBEAFE',
    fontSize: 14,
    lineHeight: 20,
  },
});
