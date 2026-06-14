import { StyleSheet } from 'react-native';

export const color = {
  black: '#000000',
  slate: '#E9E9E9',
  slate10: '#F4F4F4',
  slate20: '#818181',
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
  blue600: '#60CCED',
  blue700: '#1D4ED8',
  red: '#FF0B0B',
  amber700: '#B45309',
  emerald700: '#047857',
  white: '#FFFFFF',
};

export const appStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: color.slate50,
  },
  appShell: {
    flex: 1,
  },
  screenScroll: {
    flex: 1,
  },
  authScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  loginCard: {
    padding: 20,
    gap: 16,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  loginLogoWrap: {
    alignItems: 'center',
  },
  loginLogoCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blue600,
  },
  loginLogoLetter: {
    color: color.white,
    fontSize: 24,
    fontWeight: '700',
  },
  loginTitle: {
    color: color.black,
    fontSize: 40,
    lineHeight: 28,
    fontWeight: '400',
    textAlign: 'center',
  },
  loginDescription: {
    color: color.black,
    fontSize: 26,
    lineHeight: 28,
    fontWeight: '400',
    textAlign: 'center',
  },
  stackGap12: {
    gap: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: color.slate,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: color.slate900,
    backgroundColor: color.slate,
  },
  primaryButton: {
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '400',
  },
  fullWidthButton: {
    width: '100%',
  },
  loginDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: color.slate200,
  },
  loginDividerText: {
    color: color.slate500,
    fontSize: 13,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: color.slate300,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: color.white,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: color.slate700,
    fontSize: 14,
    fontWeight: '600',
  },
});
