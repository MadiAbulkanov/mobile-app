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

export const styles = StyleSheet.create({
  stackGap16: {
    gap: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: color.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: color.slate200,
  },
  backButtonText: {
    color: color.slate700,
    fontSize: 14,
    fontWeight: '600',
  },
  actionRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: color.blue600,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: color.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: color.white,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.slate200,
  },
  secondaryButtonText: {
    color: color.slate700,
    fontSize: 14,
    fontWeight: '600',
  },
});
