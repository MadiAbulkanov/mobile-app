import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  DotsIcon,
  FilterIcon,
  KPIcon,
  PaymentIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'src/components/common/icons';
import { color } from '../../styles/appStyles';
import { OwnerOrderCard, OwnerOrderDraft } from '../../types/fieldOps';
import { OrderPaymentModal } from './OrderPaymentModal';

type DesignerOrderDetailScreenProps = {
  measurements: Array<{
    id: string;
    orderId: string;
    room: string;
    product: string;
    width: string;
    height: string;
    curtainFabric: string;
    curtainCentimeter: string;
    tulleFabric: string;
    tulleCentimeter: string;
    mountType: string;
    note: string;
    cost: string;
  }>;
  order: OwnerOrderCard | null | undefined;
  onBack: () => void;
  onCreateMeasurement: () => void;
  onDeleteMeasurement: (measurementId: string) => void;
  onEditMeasurement: (
    draft: {
      room: string;
      product: string;
      width: string;
      height: string;
      curtainFabric: string;
      curtainCentimeter: string;
      tulleFabric: string;
      tulleCentimeter: string;
      mountType: string;
      note: string;
    },
    measurementId: string
  ) => void;
  onDelete: (orderId: string) => void;
  onEdit: (draft: OwnerOrderDraft, orderId?: string) => void;
};

type Measurement = {
  id: string;
  room_name: string;
  product_name: string;
  window_size: string;
  curtain: string;
  curtain_length: string;
  tulle: string;
  tulle_length: string;
  mount_type: string;
  comment: string;
  quantity: string;
  cost: string;
};

const MOCK_ORDER: OwnerOrderCard = {
  id: 'mock-1',
  order_number: 'ЗАК-001',
  created_at: '2026-06-13',
  status: 'in_work',
  amount: '142 500 ₸',
  customerId: 'client-1',
  customerName: 'Иван Петров',
  selectedDesigner: 'Мария Сидорова',
  measurementDate: '15 июня 2026',
  plannedCompletion: '30 июня 2026',
  installationCity: 'Москва',
  installationStreet: 'ул. Тверская',
  installationBuilding: '12',
  installationApartment: '45',
  installationNotes: 'Подъезд 2, код домофона 1234',
  notes: 'Заказ требует согласования по измерениям',
};

export const DesignerOrderDetailScreen: React.FC<DesignerOrderDetailScreenProps> = ({
  measurements,
  order,
  onBack,
  onCreateMeasurement,
  onDeleteMeasurement,
  onEditMeasurement,
  onDelete,
  onEdit,
}) => {
  const displayOrder = order || MOCK_ORDER;
  const normalizedMeasurements = React.useMemo<Measurement[]>(() => {
    return measurements
      .filter(measurement => measurement.orderId === displayOrder.id)
      .map(measurement => ({
        id: measurement.id,
        room_name: measurement.room,
        product_name: measurement.product,
        window_size: `${measurement.width}x${measurement.height} см`,
        curtain: measurement.curtainFabric,
        curtain_length: `${measurement.curtainCentimeter} см`,
        tulle: measurement.tulleFabric,
        tulle_length: `${measurement.tulleCentimeter} см`,
        mount_type: measurement.mountType,
        comment: measurement.note,
        quantity: '1',
        cost: measurement.cost,
      }));
  }, [measurements, displayOrder.id]);

  const [isPaymentModalVisible, setIsPaymentModalVisible] = React.useState(false);
  const [prepaymentPercentValue, setPrepaymentPercentValue] = React.useState('50');
  const [prepaymentValue, setPrepaymentValue] = React.useState('500 000');
  const [selectedMeasurement, setSelectedMeasurement] = React.useState<Measurement | null>(null);
  const [menuMeasurementId, setMenuMeasurementId] = React.useState<string | null>(null);

  const fullAddress = `${displayOrder.installationCity}, ${displayOrder.installationStreet}, ${displayOrder.installationBuilding}${displayOrder.installationApartment ? ` кв. ${displayOrder.installationApartment}` : ''}`;

  const handleDelete = () => {
    onDelete(displayOrder.id);
  };

  const handleEdit = () => {
    onEdit(
      {
        customerId: displayOrder.customerId,
        customerName: displayOrder.customerName,
        selectedDesigner: displayOrder.selectedDesigner,
        measurementDate: displayOrder.measurementDate,
        plannedCompletion: displayOrder.plannedCompletion,
        installationCity: displayOrder.installationCity,
        installationStreet: displayOrder.installationStreet,
        installationBuilding: displayOrder.installationBuilding,
        installationApartment: displayOrder.installationApartment,
        installationNotes: displayOrder.installationNotes,
        notes: displayOrder.notes,
      },
      displayOrder.id
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerColumn}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButtonText}>Назад</Text>
        </Pressable>
        <Text style={styles.title}>{displayOrder.order_number}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.iconButton} onPress={handleEdit}>
          <PencilIcon />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={handleDelete}>
          <TrashIcon />
        </Pressable>
      </View>

      {/* Order Info Card */}
      <View style={styles.card}>
        <View style={styles.informationRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Адрес:</Text>
            <Text style={styles.infoText}>{fullAddress}</Text>
          </View>
        </View>

        <View style={styles.informationRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Дата замера:</Text>
            <Text style={styles.infoText}>{displayOrder.measurementDate || '—'}</Text>
          </View>
        </View>
      </View>

      {/* Measurements Section */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Замеры</Text>
          <View style={styles.sectionActions}>
            <Pressable style={styles.actionButton}>
              <KPIcon />
              <Text style={styles.actionButtonText}>Создать КП</Text>
            </Pressable>
            <View style={styles.buttonsSection}>
              <Pressable style={styles.smallActionButton} onPress={onCreateMeasurement}>
                <PlusIcon />
              </Pressable>
              <Pressable
                style={styles.smallActionButton}
                onPress={() => setIsPaymentModalVisible(true)}
              >
                <PaymentIcon />
              </Pressable>
              <Pressable style={styles.smallActionButton}>
                <FilterIcon />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.measurementsList}>
          {normalizedMeasurements.map(measurement => (
            <Pressable
              key={measurement.id}
              style={[
                styles.measurementCard,
                menuMeasurementId === measurement.id && styles.measurementCardActive,
              ]}
              onPress={() => setSelectedMeasurement(measurement)}
            >
              <View style={styles.measurementTop}>
                <Text style={styles.roomName}>{measurement.room_name}</Text>
                <Text style={styles.windowSize}>{measurement.window_size}</Text>
              </View>
              <View style={styles.measurementRightColumn}>
                <Text style={styles.cost}>{measurement.cost}</Text>
                <Pressable
                  style={styles.measurementDotsButton}
                  onPress={event => {
                    event.stopPropagation();
                    setMenuMeasurementId(current =>
                      current === measurement.id ? null : measurement.id
                    );
                  }}
                >
                  <DotsIcon />
                </Pressable>
              </View>

              {menuMeasurementId === measurement.id ? (
                <View style={styles.measurementMenu}>
                  <Pressable
                    style={styles.measurementMenuItem}
                    onPress={event => {
                      event.stopPropagation();
                      onEditMeasurement(
                        {
                          room: measurement.room_name,
                          product: measurement.product_name,
                          width: measurement.window_size.split('x')[0],
                          height: measurement.window_size.split('x')[1]?.replace(' см', '') || '',
                          curtainFabric: measurement.curtain,
                          curtainCentimeter: measurement.curtain_length.replace(' см', ''),
                          tulleFabric: measurement.tulle,
                          tulleCentimeter: measurement.tulle_length.replace(' см', ''),
                          mountType: measurement.mount_type,
                          note: measurement.comment,
                        },
                        measurement.id
                      );
                      setMenuMeasurementId(null);
                    }}
                  >
                    <Text style={styles.measurementMenuItemText}>Редактировать</Text>
                  </Pressable>
                  <Pressable
                    style={styles.measurementMenuItem}
                    onPress={event => {
                      event.stopPropagation();
                      onDeleteMeasurement(measurement.id);
                      setMenuMeasurementId(null);
                    }}
                  >
                    <Text
                      style={[styles.measurementMenuItemText, styles.measurementMenuItemTextDanger]}
                    >
                      Удалить
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>
      </View>

      <Modal
        visible={selectedMeasurement !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMeasurement(null)}
      >
        <Pressable
          style={styles.measurementModalOverlay}
          onPress={() => setSelectedMeasurement(null)}
        >
          <Pressable style={styles.measurementModalCard} onPress={() => {}}>
            {selectedMeasurement ? (
              <>
                <Text style={styles.measurementModalTitle}>{selectedMeasurement.room_name}</Text>
                <Text style={styles.measurementModalLine}>
                  {selectedMeasurement.product_name} (
                  {selectedMeasurement.window_size.replace(' см', '')})
                </Text>
                <Text style={styles.measurementModalLine}>
                  Шторы: {selectedMeasurement.curtain} ({selectedMeasurement.curtain_length})
                </Text>
                <Text style={styles.measurementModalLine}>
                  Тюль: {selectedMeasurement.tulle} ({selectedMeasurement.tulle_length})
                </Text>
                <Text style={styles.measurementModalLine}>
                  Тип крепления: {selectedMeasurement.mount_type}
                </Text>
                <Text style={styles.measurementModalLine}>
                  Комментарий: {selectedMeasurement.comment}
                </Text>
                <Text style={styles.measurementModalCost}>
                  Стоимость: {selectedMeasurement.cost}
                </Text>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>

      <OrderPaymentModal
        visible={isPaymentModalVisible}
        totalCost={displayOrder.amount}
        prepaymentPercentValue={prepaymentPercentValue}
        prepaymentValue={prepaymentValue}
        onChangePrepaymentPercentValue={setPrepaymentPercentValue}
        onChangePrepaymentValue={setPrepaymentValue}
        onClose={() => setIsPaymentModalVisible(false)}
        onDelete={handleDelete}
        onEdit={handleEdit}
        showActions={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.white,
  },
  content: {
    gap: 16,
    paddingBottom: 32,
  },
  headerColumn: {
    gap: 12,
    marginTop: 20,
    padding: 16,
  },
  title: {
    color: color.black,
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
  },
  backButtonText: {
    color: color.slate20,
    fontSize: 14,
    fontWeight: '600',
  },

  /* Order Info Card */
  card: {
    backgroundColor: color.slate10,
    borderWidth: 1,
    borderColor: color.slate100,
    borderRadius: 14,
    padding: 16,
    gap: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    gap: 4,
  },
  orderTitle: {
    color: color.black,
    fontSize: 20,
    fontWeight: '500',
  },
  orderSubtitle: {
    color: color.slate500,
    fontSize: 12,
    fontWeight: '400',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 16,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  informationRow: {
    gap: 8,
  },
  infoBlock: {
    flexDirection: 'row',
    gap: 4,
  },
  infoLabel: {
    color: color.black,
    fontSize: 20,
    fontWeight: '400',
  },
  infoText: {
    color: color.black,
    fontSize: 20,
    fontWeight: '300',
  },

  /* Measurements Section */
  sectionCard: {
    gap: 16,
  },
  sectionHeader: {
    gap: 19,
    padding: 16,
  },
  sectionTitle: {
    color: color.black,
    fontSize: 32,
    fontWeight: '400',
  },
  sectionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#5DA0FF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 3,
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  actionButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '400',
  },
  smallActionButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  costText: {
    color: color.black,
    fontSize: 12,
    fontWeight: '500',
  },

  measurementsList: {
    gap: 3,
    overflow: 'visible',
  },
  measurementCard: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.slate10,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    overflow: 'visible',
    zIndex: 1,
  },
  measurementCardActive: {
    zIndex: 1000,
    elevation: 20,
  },
  measurementTop: {
    gap: 1,
  },
  measurementRightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  measurementDotsButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  measurementMenu: {
    position: 'absolute',
    right: 10,
    top: 44,
    backgroundColor: color.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.slate200,
    minWidth: 150,
    zIndex: 2000,
    shadowColor: color.black,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
  measurementMenuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  measurementMenuItemText: {
    color: color.black,
    fontSize: 15,
    fontWeight: '400',
  },
  measurementMenuItemTextDanger: {
    color: color.red,
  },
  roomName: {
    color: color.black,
    fontSize: 18,
    fontWeight: '300',
  },
  cost: {
    color: color.black,
    fontSize: 20,
    fontWeight: '400',
  },
  windowSize: {
    color: color.black,
    fontSize: 18,
    fontWeight: '300',
  },
  measurementModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  measurementModalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: color.white,
    borderRadius: 14,
    padding: 20,
    gap: 10,
  },
  measurementModalTitle: {
    color: color.black,
    fontSize: 20,
    fontWeight: '400',
  },
  measurementModalLine: {
    color: color.black,
    fontSize: 20,
    fontWeight: '300',
  },
  measurementModalCost: {
    color: color.black,
    fontSize: 20,
    fontWeight: '400',
    marginTop: 20,
  },
});
