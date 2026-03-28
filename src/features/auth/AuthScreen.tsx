import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { appStyles as styles } from '../../styles/appStyles';
import { Role } from '../../types/fieldOps';

type AuthScreenProps = {
  onSelectRole: (role: Role) => void;
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSelectRole }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.authScrollContent}
      style={styles.screenScroll}
    >
      <View style={styles.loginCard}>
        {/* Logo */}
        <View style={styles.loginLogoWrap}>
          <View style={styles.loginLogoCircle}>
            <Text style={styles.loginLogoLetter}>B</Text>
          </View>
        </View>

        <Text style={styles.loginTitle}>Войдите, чтобы увидеть задачи на сегодня</Text>

        {/* Fields */}
        <View style={styles.stackGap12}>
          <TextInput
            style={styles.textInput}
            placeholder="Email или телефон"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Пароль"
            placeholderTextColor="#94A3B8"
            secureTextEntry
          />
        </View>

        {/* Primary action */}
        <Pressable
          style={[styles.primaryButton, styles.fullWidthButton]}
          onPress={() => onSelectRole('employee')}
        >
          <Text style={styles.primaryButtonText}>Войти</Text>
        </Pressable>

        {/* Demo shortcuts */}
        <View style={styles.loginDivider}>
          <View style={styles.loginDividerLine} />
          <Text style={styles.loginDividerText}>или войти как</Text>
          <View style={styles.loginDividerLine} />
        </View>

        <View style={styles.stackGap12}>
          <Pressable
            style={[styles.secondaryButton, styles.fullWidthButton]}
            onPress={() => onSelectRole('manager')}
          >
            <Text style={styles.secondaryButtonText}>Менеджер (демо)</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

