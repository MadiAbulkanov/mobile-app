import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { appStyles as styles, color } from '../../styles/appStyles';
import { LogoIcon } from 'src/components/common/icons';

const demoRoleAccounts = [
  { label: 'Owner (владелец)', email: 'demo-owner@local' },
  { label: 'Дизайнер', email: 'demo-designer@local' },
  { label: 'Склад', email: 'demo-warehouse@local' },
  { label: 'Швейный цех', email: 'demo-seamstress@local' },
  { label: 'Монтажник', email: 'demo-installer@local' },
];

type AuthScreenProps = {
  authError: string | null;
  isLoading: boolean;
  onLogin: (email: string, password: string) => Promise<boolean>;
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ authError, isLoading, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return;
    }

    await onLogin(email.trim(), password.trim());
  };

  return (
    <ScrollView contentContainerStyle={styles.authScrollContent} style={styles.screenScroll}>
      <View style={styles.loginCard}>
        {/* Logo */}
        <View style={styles.loginLogoWrap}>
          <LogoIcon size={160} />
        </View>

        <Text style={styles.loginTitle}>Единая база</Text>
        <Text style={styles.loginDescription}>Название организации</Text>

        {/* Fields */}
        <View style={{ gap: 12, marginTop: 40 }}>
          <TextInput
            style={[styles.textInput, emailFocused && { borderColor: color.blue500 }]}
            placeholder="E-mail/телефон"
            placeholderTextColor="#747474"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <TextInput
            style={[styles.textInput, passwordFocused && { borderColor: color.blue500 }]}
            placeholder="Пароль"
            placeholderTextColor="#747474"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </View>

        {authError ? <Text style={{ color: '#B91C1C' }}>{authError}</Text> : null}

        {/* Primary action */}
        <Pressable
          style={[styles.primaryButton, styles.fullWidthButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>Войти</Text>
        </Pressable>

        <View style={{ gap: 8 }}>
          <Text style={{ color: color.slate600, textAlign: 'center' }}>Быстрый вход по ролям</Text>
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}
          >
            {demoRoleAccounts.map(item => (
              <Pressable
                key={item.email}
                onPress={() => onLogin(item.email, 'demo')}
                disabled={isLoading}
              >
                <Text style={styles.secondaryButtonText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
