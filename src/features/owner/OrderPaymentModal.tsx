import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { PencilIcon, TrashIcon } from 'src/components/common/icons';

import { color } from '../../styles/appStyles';

type OrderPaymentModalProps = {
  visible: boolean;
  totalCost: string;
  prepaymentPercentValue?: string;
  prepaymentValue: string;
  onChangePrepaymentPercentValue?: (value: string) => void;
  onChangePrepaymentValue: (value: string) => void;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onSave?: () => void;
  showActions?: boolean;
};

export const OrderPaymentModal: React.FC<OrderPaymentModalProps> = ({
  visible,
  totalCost,
  prepaymentPercentValue = '',
  prepaymentValue,
  onChangePrepaymentPercentValue,
  onChangePrepaymentValue,
  onClose,
  onDelete,
  onEdit,
  onSave = onClose,
  showActions = true,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          {showActions ? (
            <View style={styles.modalIconsRow}>
              <Pressable style={styles.modalIconButton} onPress={onEdit}>
                <PencilIcon />
              </Pressable>
              <Pressable style={styles.modalIconButton} onPress={onDelete}>
                <TrashIcon />
              </Pressable>
            </View>
          ) : null}

          <View style={styles.amountRow}>
            <Text style={styles.modalLableText}>Итоговая стоимость: </Text>
            <Text style={styles.modalText}>{totalCost}</Text>
          </View>

          <View style={styles.modalInputRow}>
            <Text style={styles.modalLableText}>Размер предоплаты:</Text>
            <TextInput
              value={prepaymentPercentValue}
              onChangeText={onChangePrepaymentPercentValue}
              keyboardType="numeric"
              style={styles.modalInput}
              placeholder="0"
              placeholderTextColor={color.slate500}
            />
            <Text style={styles.modalText}>%</Text>
          </View>

          <View style={styles.modalInputRow}>
            <Text style={styles.modalLableText}>Внесено: </Text>
            <TextInput
              value={prepaymentValue}
              onChangeText={onChangePrepaymentValue}
              keyboardType="numeric"
              style={styles.modalInput}
              placeholder="500 000"
              placeholderTextColor={color.slate500}
            />
            <Text style={styles.modalText}>₸</Text>
          </View>

          <Pressable style={styles.modalSaveButton} onPress={onSave}>
            <Text style={styles.modalSaveButtonText}>Сохранить</Text>
          </Pressable>
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
    gap: 15,
  },
  modalIconsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalIconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.slate10,
  },
  amountRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalLableText: {
    color: color.black,
    fontSize: 20,
    fontWeight: '400',
  },
  modalText: {
    color: color.black,
    fontSize: 20,
    fontWeight: '300',
  },
  modalInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 7,
  },
  modalInput: {
    flex: 1,
    minWidth: 120,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: color.black,
    fontSize: 18,
    fontWeight: '300',
    backgroundColor: color.slate10,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  modalSaveButton: {
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalSaveButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '400',
  },
});
