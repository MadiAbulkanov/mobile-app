import { StyleSheet } from 'react-native';

import { color } from '../../styles/appStyles';

export const styles = StyleSheet.create({
  roleShell: {
    flex: 1,
    backgroundColor: color.slate50,
  },
  screenScroll: {
    flex: 1,
  },
  roleScrollContent: {
    padding: 16,
    paddingBottom: 92,
    gap: 12,
  },
});
