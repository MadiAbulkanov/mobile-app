import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  DotsIcon,
  FilterIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  UserIcon,
} from 'src/components/common/icons';

import { color } from '../../styles/appStyles';
import { OwnerOrderCard, OwnerOrderDraft, OwnerOrdersTab, Task } from '../../types/fieldOps';
import { formatDateShort } from '../../utils/date';
import { OrderPaymentModal } from './OrderPaymentModal';

type OwnerOrdersScreenProps = {
  activeTab: OwnerOrdersTab;
  onBack: () => void;
  backButtonLabel?: string;
  onCreateOrder: () => void;
  onDeleteOrder: (orderId: string) => void;
  onEditOrder: (draft: OwnerOrderDraft, orderId?: string) => void;
  onOpenClients: () => void;
  onSelectOrder?: (orderId: string) => void;
  onSelectTab: (tab: OwnerOrdersTab) => void;
  ownerOrders: OwnerOrderCard[];
  tasks: Task[];
};

type OrderCard = {
  id: string;
  order_number: string;
  customer_name: string;
  created_at: string;
  status: OrderStatus;
  amount: string;
};

type OrderStatus = 'in_work' | 'waiting_final_payment' | 'completed' | 'expired';

const MOCK_ORDERS: OrderCard[] = [
  {
    id: 'ORD-001',
    order_number: 'О-2026-001',
    customer_name: 'Алина Морозова',
    created_at: '2026-05-28T10:15:00',
    status: 'in_work',
    amount: '84 500 ₽',
  },
  {
    id: 'ORD-002',
    order_number: 'О-2026-002',
    customer_name: 'Дмитрий Захаров',
    created_at: '2026-05-25T09:00:00',
    status: 'waiting_final_payment',
    amount: '32 000 ₽',
  },
  {
    id: 'ORD-003',
    order_number: 'О-2026-003',
    customer_name: 'Ирина Лебедева',
    created_at: '2026-05-20T14:30:00',
    status: 'completed',
    amount: '121 200 ₽',
  },
  {
    id: 'ORD-004',
    order_number: 'О-2026-004',
    customer_name: 'Сергей Новиков',
    created_at: '2026-05-10T08:45:00',
    status: 'expired',
    amount: '56 700 ₽',
  },
  {
    id: 'ORD-005',
    order_number: 'О-2026-005',
    customer_name: 'Ольга Титова',
    created_at: '2026-04-30T11:00:00',
    status: 'waiting_final_payment',
    amount: '18 300 ₽',
  },
  {
    id: 'ORD-006',
    order_number: 'О-2026-006',
    customer_name: 'Павел Федоров',
    created_at: '2026-04-22T16:20:00',
    status: 'in_work',
    amount: '47 900 ₽',
  },
  {
    id: 'ORD-007',
    order_number: 'О-2026-007',
    customer_name: 'Наталья Смирнова',
    created_at: '2026-04-15T13:10:00',
    status: 'completed',
    amount: '93 600 ₽',
  },
  {
    id: 'ORD-008',
    order_number: 'О-2026-008',
    customer_name: 'Роман Кузнецов',
    created_at: '2026-03-28T10:00:00',
    status: 'expired',
    amount: '11 000 ₽',
  },
];

const tabs: Array<{ key: OwnerOrdersTab; label: string }> = [
  { key: 'all', label: 'Все' },
  { key: 'inwork', label: 'В работе' },
  { key: 'payment', label: 'Оплата' },
  { key: 'overdue', label: 'Просрочено' },
  { key: 'materials', label: 'Материалы' },
];

const statusMeta: Record<OrderStatus, { label: string; color: string }> = {
  in_work: { label: 'В работе', color: '#32ED51' },
  waiting_final_payment: { label: 'В ожидании', color: '#EBEB1D' },
  completed: { label: 'Завершен', color: '#D3D3D3' },
  expired: { label: 'Просрочен', color: color.red },
};

const isOverdue = (created_at: string, status: OrderStatus) => {
  const date = new Date(created_at);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return Date.now() - date.getTime() > 3 * 24 * 60 * 60 * 1000 && status !== 'completed';
};

export const OwnerOrdersScreen: React.FC<OwnerOrdersScreenProps> = ({
  activeTab,
  onBack,
  backButtonLabel = 'Назад',
  onCreateOrder,
  onDeleteOrder,
  onEditOrder,
  onOpenClients,
  onSelectOrder,
  onSelectTab,
  ownerOrders,
  tasks,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderCard | null>(null);
  const [menuOrderId, setMenuOrderId] = useState<string | null>(null);
  const [prepaymentPercentValue, setPrepaymentPercentValue] = useState('50');
  const [prepaymentValue, setPrepaymentValue] = useState('500 000');
  const [hiddenOrderIds, setHiddenOrderIds] = useState<string[]>([]);
  const isPaymentModalVisible = selectedOrder !== null;

  const liveOrders = useMemo<OrderCard[]>(() => {
    return tasks.map(task => ({
      id: task.id,
      order_number: task.id,
      customer_name: task.title,
      created_at: task.created_at,
      status:
        task.status === 'completed'
          ? 'completed'
          : task.status === 'in_progress'
            ? 'in_work'
            : task.status === 'rescheduled'
              ? 'waiting_final_payment'
              : 'expired',
      amount: '—',
    }));
  }, [tasks]);

  const allOrders = useMemo<OrderCard[]>(() => {
    const ids = new Set(liveOrders.map(o => o.id));
    const createdOrders = ownerOrders.map(order => ({
      ...order,
      customer_name: order.customerName,
    }));

    return [...createdOrders, ...liveOrders, ...MOCK_ORDERS.filter(o => !ids.has(o.id))];
  }, [liveOrders, ownerOrders]);

  const cards = useMemo<OrderCard[]>(() => {
    return allOrders.filter(order => {
      if (hiddenOrderIds.includes(order.id)) return false;
      if (activeTab === 'all') return true;
      if (activeTab === 'inwork') return order.status === 'in_work';
      if (activeTab === 'payment') return order.status === 'waiting_final_payment';
      if (activeTab === 'materials') return order.status === 'waiting_final_payment';
      if (activeTab === 'overdue') return isOverdue(order.created_at, order.status);
      return false;
    });
  }, [activeTab, allOrders, hiddenOrderIds]);

  const handleDeleteOrder = (order: OrderCard) => {
    const existsInOwnerOrders = ownerOrders.some(item => item.id === order.id);

    if (existsInOwnerOrders) {
      onDeleteOrder(order.id);
    } else {
      setHiddenOrderIds(current => [...current, order.id]);
    }
  };

  const handleDeleteSelectedOrder = () => {
    if (!selectedOrder) {
      return;
    }

    handleDeleteOrder(selectedOrder);
    setSelectedOrder(null);
  };

  const handleEditOrder = (order: OrderCard) => {
    const ownerOrder = ownerOrders.find(item => item.id === order.id);

    if (ownerOrder) {
      onEditOrder(
        {
          customerId: ownerOrder.customerId,
          customerName: ownerOrder.customerName,
          selectedDesigner: ownerOrder.selectedDesigner,
          measurementDate: ownerOrder.measurementDate,
          plannedCompletion: ownerOrder.plannedCompletion,
          installationCity: ownerOrder.installationCity,
          installationStreet: ownerOrder.installationStreet,
          installationBuilding: ownerOrder.installationBuilding,
          installationApartment: ownerOrder.installationApartment,
          installationNotes: ownerOrder.installationNotes,
          notes: ownerOrder.notes,
        },
        ownerOrder.id
      );
      return;
    }

    onEditOrder({
      customerId: '',
      customerName: order.customer_name,
      selectedDesigner: '',
      measurementDate: '',
      plannedCompletion: '',
      installationCity: '',
      installationStreet: '',
      installationBuilding: '',
      installationApartment: '',
      installationNotes: '',
    });
  };

  const handleEditSelectedOrder = () => {
    if (!selectedOrder) {
      return;
    }

    handleEditOrder(selectedOrder);
    setSelectedOrder(null);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerColumn}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButtonText}>{backButtonLabel}</Text>
        </Pressable>
        <Text style={styles.title}>Управление заказами</Text>
      </View>

      <View style={styles.buttonsBlock}>
        <Pressable onPress={onCreateOrder}>
          <PlusIcon />
        </Pressable>
        <Pressable onPress={onOpenClients}>
          <UserIcon />
        </Pressable>
        <SearchIcon />
        <FilterIcon />
      </View>

      <View style={styles.cardList}>
        {cards.map(order => {
          const meta = statusMeta[order.status];

          return (
            <Pressable
              key={order.id}
              style={[styles.card, menuOrderId === order.id && styles.cardActive]}
              onPress={() => {
                if (onSelectOrder) {
                  onSelectOrder(order.id);
                } else {
                  setMenuOrderId(null);
                  setSelectedOrder(order);
                  setPrepaymentPercentValue('50');
                  setPrepaymentValue('500 000');
                }
              }}
            >
              <View style={styles.cardTopColumn}>
                <View style={styles.cardRow}>
                  <Text style={styles.orderNumber}>{order.order_number}</Text>
                  <View style={styles.verticalDivider} />
                  <Text style={styles.customerName}>{order.customer_name}</Text>
                </View>
                <Text style={styles.metaText}>
                  <Text style={styles.metaLabel}>Создан: </Text>
                  {formatDateShort(order.created_at)}
                </Text>
                <Text style={styles.metaText}>
                  <Text style={styles.metaLabel}>Дизайнер: </Text>-
                </Text>
              </View>

              <View style={styles.cardRightColumn}>
                <View style={[styles.statusDot, { backgroundColor: meta.color }]} />
                {!onSelectOrder ? (
                  <Pressable
                    style={styles.orderDotsButton}
                    onPress={event => {
                      event.stopPropagation();
                      setMenuOrderId(current => (current === order.id ? null : order.id));
                    }}
                  >
                    <DotsIcon />
                  </Pressable>
                ) : null}
              </View>

              {!onSelectOrder && menuOrderId === order.id ? (
                <View style={styles.orderMenu}>
                  <Pressable
                    style={styles.orderMenuItem}
                    onPress={event => {
                      event.stopPropagation();
                      handleEditOrder(order);
                      setMenuOrderId(null);
                    }}
                  >
                    <Text style={styles.orderMenuItemText}>Редактировать</Text>
                  </Pressable>
                  <Pressable
                    style={styles.orderMenuItem}
                    onPress={event => {
                      event.stopPropagation();
                      handleDeleteOrder(order);
                      setMenuOrderId(null);
                    }}
                  >
                    <Text style={[styles.orderMenuItemText, styles.orderMenuItemTextDanger]}>
                      Удалить
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </Pressable>
          );
        })}

        {cards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Нет заказов для выбранного раздела.</Text>
          </View>
        ) : null}
      </View>

      <OrderPaymentModal
        visible={isPaymentModalVisible}
        totalCost="1 000 000 ₸"
        prepaymentPercentValue={prepaymentPercentValue}
        prepaymentValue={prepaymentValue}
        onChangePrepaymentPercentValue={setPrepaymentPercentValue}
        onChangePrepaymentValue={setPrepaymentValue}
        onClose={() => setSelectedOrder(null)}
        onDelete={handleDeleteSelectedOrder}
        onEdit={handleEditSelectedOrder}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: 16,
  },
  headerColumn: {
    flexDirection: 'column',
    gap: 12,
    padding: 16,
    marginTop: 20,
  },

  buttonsBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 24,
    paddingHorizontal: 20,
  },
  title: {
    color: color.black,
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
  },
  subtitle: {
    color: color.slate500,
    fontSize: 13,
    marginTop: 4,
  },
  backButtonText: {
    color: color.slate20,
    fontSize: 14,
    fontWeight: '600',
  },
  cardList: {
    gap: 3,
    marginBottom: 10,
    overflow: 'visible',
  },
  card: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.slate10,
    padding: 16,
    gap: 8,
    overflow: 'visible',
    zIndex: 1,
  },
  cardActive: {
    zIndex: 1000,
    elevation: 20,
  },
  cardTopColumn: {
    flexDirection: 'column',
    gap: 8,
  },
  cardRightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderDotsButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderMenu: {
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
  orderMenuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  orderMenuItemText: {
    color: color.black,
    fontSize: 15,
    fontWeight: '400',
  },
  orderMenuItemTextDanger: {
    color: color.red,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderNumber: {
    color: color.black,
    fontSize: 18,
    fontWeight: '300',
  },
  verticalDivider: {
    width: 1,
    height: 18,
    backgroundColor: color.black,
  },
  statusBadge: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 30,
    height: 30,
    borderRadius: 999,
  },
  customerName: {
    color: color.black,
    fontSize: 18,
    fontWeight: '300',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    color: color.black,
    fontSize: 18,
    fontWeight: '300',
  },
  metaLabel: {
    fontWeight: '400',
  },
  emptyState: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.slate200,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    color: color.slate500,
    fontSize: 14,
  },
});
