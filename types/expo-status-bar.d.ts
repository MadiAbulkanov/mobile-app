declare module 'expo-status-bar' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export type ExpoStatusBarStyle = 'auto' | 'inverted' | 'light' | 'dark';

  export interface ExpoStatusBarProps extends ViewProps {
    style?: ExpoStatusBarStyle;
    translucent?: boolean;
    backgroundColor?: string;
    networkActivityIndicatorVisible?: boolean;
    animated?: boolean;
  }

  export const StatusBar: React.FC<ExpoStatusBarProps>;
  const _default: React.FC<ExpoStatusBarProps>;
  export default _default;
}
