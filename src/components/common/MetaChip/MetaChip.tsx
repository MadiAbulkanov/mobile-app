import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './MetaChip.styles';

type MetaChipProps = {
  color: string;
  label: string;
  tint: string;
};

export const MetaChip: React.FC<MetaChipProps> = ({ color, label, tint }) => {
  return (
    <View style={[styles.metaChip, { backgroundColor: tint }]}>
      <Text style={[styles.metaChipText, { color }]}>{label}</Text>
    </View>
  );
};
