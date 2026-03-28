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

export const employeeBottomNavStyles = StyleSheet.create({
  employeeBottomNavWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  employeeBottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: color.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: color.slate200,
    padding: 8,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  employeeBottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  employeeBottomNavItemActive: {
    backgroundColor: color.blue600,
  },
  employeeBottomNavText: {
    color: color.slate500,
    fontSize: 13,
    fontWeight: '600',
  },
  employeeBottomNavTextActive: {
    color: color.white,
  },
});
