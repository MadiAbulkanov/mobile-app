import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { appStyles as styles } from '../styles/appStyles';
import { AuthScreen } from '../features/auth/AuthScreen';
import {
  DesignerCreateMeasurementScreen,
  DesignerOrderDetailScreen,
  OwnerAnalyticsScreen,
  OwnerClientsScreen,
  OwnerCreateOrderScreen,
  OwnerOrdersScreen,
} from '../features/owner';
import { useFieldOpsState } from '../hooks/useFieldOpsState';

export const AppRoot: React.FC = () => {
  const { state, actions } = useFieldOpsState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        {state.role === null ? (
          <AuthScreen
            authError={state.authError}
            isLoading={state.isAuthLoading}
            onLogin={actions.login}
          />
        ) : state.role === 'Owner' || state.role === 'Designer' ? (
          state.ownerScreen === 'orders' ? (
            <OwnerOrdersScreen
              activeTab={state.ownerOrdersTab}
              backButtonLabel={state.role === 'Designer' ? 'Выйти' : 'Назад'}
              onBack={state.role === 'Designer' ? actions.logout : actions.openOwnerAnalytics}
              onCreateOrder={() => actions.openOwnerCreateOrder()}
              onDeleteOrder={actions.deleteOwnerOrder}
              onEditOrder={(draft, orderId) => actions.openOwnerCreateOrder(draft, orderId)}
              onOpenClients={actions.openOwnerClients}
              onSelectOrder={state.role === 'Designer' ? actions.openOrderDetail : undefined}
              onSelectTab={actions.openOwnerOrders}
              ownerOrders={state.ownerOrders}
              tasks={state.tasks}
            />
          ) : state.ownerScreen === 'detail' ? (
            <DesignerOrderDetailScreen
              measurements={state.designerMeasurements}
              order={state.selectedOrder}
              onBack={actions.openOrdersList}
              onCreateMeasurement={actions.openMeasurementCreate}
              onDeleteMeasurement={actions.deleteDesignerMeasurement}
              onEditMeasurement={(draft, measurementId) =>
                actions.openMeasurementCreate(draft, measurementId)
              }
              onDelete={actions.deleteOwnerOrder}
              onEdit={(draft, orderId) => actions.openOwnerCreateOrder(draft, orderId)}
            />
          ) : state.ownerScreen === 'measurement-create' ? (
            <DesignerCreateMeasurementScreen
              editingMeasurementId={state.designerEditingMeasurementId}
              initialDraft={state.designerMeasurementDraft}
              isEditing={state.isDesignerMeasurementEditing}
              onBack={actions.openOrderDetailPage}
              onCreate={actions.createDesignerMeasurement}
              onUpdate={actions.updateDesignerMeasurement}
            />
          ) : state.ownerScreen === 'clients' ? (
            <OwnerClientsScreen
              clients={state.ownerClients}
              onBack={actions.openOwnerOrdersPage}
              onCreateClient={actions.createOwnerClient}
              onDeleteClient={actions.deleteOwnerClient}
              onUpdateClient={actions.updateOwnerClient}
            />
          ) : state.ownerScreen === 'create' ? (
            <OwnerCreateOrderScreen
              clients={state.ownerClients}
              editingOrderId={state.ownerEditingOrderId}
              initialDraft={state.ownerOrderDraft}
              isEditing={state.isOwnerOrderEditing}
              onBack={actions.openOwnerOrdersPage}
              onCreateClient={actions.createOwnerClient}
              onCreateOrder={actions.createOwnerOrder}
              onUpdateOrder={actions.updateOwnerOrder}
            />
          ) : (
            <OwnerAnalyticsScreen
              onLogout={actions.logout}
              onOpenOrders={actions.openOwnerOrders}
              tasks={state.tasks}
            />
          )
        ) : null}
      </View>
    </SafeAreaView>
  );
};
