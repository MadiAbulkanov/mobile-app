import { StyleSheet } from 'react-native';

import { color } from '../../styles/appStyles';

export const styles = StyleSheet.create({
  managerShell: {
    flex: 1,
    backgroundColor: color.slate50,
  },
  managerShellDesktop: {
    flexDirection: 'row',
  },
  managerContentEyebrow: {
    color: color.slate500,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  menuToggleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  menuToggleButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.slate300,
    backgroundColor: color.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuToggleIcon: {
    width: 18,
    color: color.slate900,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },
  managerSidebar: {
    backgroundColor: color.slate900,
    padding: 16,
    gap: 16,
  },
  managerSidebarDesktop: {
    width: 260,
    minHeight: '100%',
  },
  managerSidebarCompact: {
    borderBottomWidth: 1,
    borderBottomColor: color.slate700,
  },
  stackGap8: {
    gap: 8,
  },
  sidebarNavItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  sidebarNavItemActive: {
    backgroundColor: color.blue600,
  },
  sidebarNavText: {
    color: color.slate200,
    fontSize: 14,
    fontWeight: '500',
  },
  sidebarNavTextActive: {
    color: color.white,
    fontWeight: '700',
  },
  ghostButtonDark: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: color.slate600,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  ghostButtonDarkText: {
    color: color.slate200,
    fontSize: 14,
    textAlign: 'center',
  },
  screenScroll: {
    flex: 1,
  },
  managerContentScroll: {
    padding: 16,
    gap: 16,
  },
  managerContentScrollMenuCollapsed: {
    paddingTop: 8,
  },
});
