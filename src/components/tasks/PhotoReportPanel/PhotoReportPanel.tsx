import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { PhotoReport } from '../../../types/fieldOps';
import { styles } from './PhotoReportPanel.styles';

type PhotoReportPanelProps = {
  reports: PhotoReport[];
};

export const PhotoReportPanel: React.FC<PhotoReportPanelProps> = ({ reports }) => {
  return (
    <View style={styles.panelCard}>
      <View style={styles.rowBetweenStart}>
        <Text style={styles.panelTitle}>Фотоотчёты</Text>
        <Text style={styles.panelHint}>{reports.length}</Text>
      </View>

      {reports.length === 0 ? (
        <Text style={styles.panelText}>Фото пока не добавлены.</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photoScroll}
          contentContainerStyle={styles.photoScrollContent}
        >
          {reports.map(report => (
            <View key={report.id} style={styles.photoCard}>
              <View style={[styles.photoThumb, { backgroundColor: report.accent }]} />
              <Text style={styles.photoCardTitle}>{report.label}</Text>
              <Text style={styles.photoCardText}>{report.time}</Text>
              <Text style={styles.photoCardText}>{report.note}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
