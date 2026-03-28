import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './DetailItem.styles';

type DetailItemProps = {
  label: string;
  value: string;
};

export const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};
