import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { color } from '../../../styles/appStyles';
import { OwnerClient, OwnerClientDraft } from '../../../types/fieldOps';

type OwnerClientModalProps = {
  visible: boolean;
  client?: OwnerClient | null;
  onClose: () => void;
  onSubmit: (draft: OwnerClientDraft, clientId?: string) => void;
};

type ClientFormState = {
  fullName: string;
  phone: string;
};

const emptyForm: ClientFormState = {
  fullName: '',
  phone: '',
};

export const OwnerClientModal: React.FC<OwnerClientModalProps> = ({
  visible,
  client,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<ClientFormState>(emptyForm);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (client) {
      setForm({ fullName: client.fullName, phone: client.phone });
      return;
    }

    setForm(emptyForm);
  }, [client, visible]);

  const title = useMemo(
    () => (client ? 'Редактирование клиента' : 'Добавление клиента'),
    [client]
  );

  const handleSave = () => {
    const draft: OwnerClientDraft = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
    };

    if (!draft.fullName || !draft.phone) {
      return;
    }

    onSubmit(draft, client?.id);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <Text style={styles.modalTitle}>{title}</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              1. Фамилия и имя <Text style={styles.requiredMark}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={form.fullName}
              onChangeText={text => setForm(current => ({ ...current, fullName: text }))}
              placeholder="Фамилия Имя"
              placeholderTextColor={color.slate500}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              2. Телефон <Text style={styles.requiredMark}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={form.phone}
              onChangeText={text => setForm(current => ({ ...current, phone: text }))}
              placeholder="+7 999 123-45-67"
              placeholderTextColor={color.slate500}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.modalActions}>
            <Pressable style={styles.primaryButton} onPress={handleSave}>
              <Text style={styles.primaryButtonText}>{client ? 'Сохранить' : 'Создать'}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: color.white,
    borderRadius: 14,
    padding: 20,
    gap: 16,
  },
  modalTitle: {
    color: color.black,
    fontSize: 24,
    fontWeight: '400',
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: color.black,
    fontSize: 16,
    fontWeight: '400',
  },
  requiredMark: {
    color: color.red,
  },
  input: {
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: color.slate10,
    color: color.black,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '400',
  },
});