import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PencilIcon, PlusIcon, SearchIcon, TrashIcon } from 'src/components/common/icons';

import { color } from '../../styles/appStyles';
import { OwnerClient, OwnerClientDraft } from '../../types/fieldOps';
import { OwnerClientModal } from './components/OwnerClientModal';

type OwnerClientsScreenProps = {
  clients: OwnerClient[];
  onBack: () => void;
  onCreateClient: (draft: OwnerClientDraft) => void;
  onDeleteClient: (clientId: string) => void;
  onUpdateClient: (clientId: string, draft: OwnerClientDraft) => void;
};

export const OwnerClientsScreen: React.FC<OwnerClientsScreenProps> = ({
  clients,
  onBack,
  onCreateClient,
  onDeleteClient,
  onUpdateClient,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<OwnerClient | null>(null);

  const openCreateModal = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const openEditModal = (client: OwnerClient) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleSubmitClient = (draft: OwnerClientDraft, clientId?: string) => {
    if (clientId) {
      onUpdateClient(clientId, draft);
      return;
    }

    onCreateClient(draft);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerColumn}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButtonText}>Назад</Text>
        </Pressable>
        <Text style={styles.title}>Клиенты</Text>
      </View>

      <View style={styles.topActions}>
        <Pressable style={styles.createButton} onPress={openCreateModal}>
          <PlusIcon />
        </Pressable>
        <Pressable style={styles.createButton}>
          <SearchIcon />
        </Pressable>
      </View>

      <View style={styles.list}>
        {clients.map(client => (
          <View key={client.id} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.clientName}>{client.fullName}</Text>
              <Text style={styles.clientPhone}>{client.phone}</Text>
            </View>

            <View style={styles.cardActions}>
              <Pressable style={styles.iconButton} onPress={() => openEditModal(client)}>
                <PencilIcon size={22} />
              </Pressable>
              <Pressable style={styles.iconButton} onPress={() => onDeleteClient(client.id)}>
                <TrashIcon size={22} />
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <OwnerClientModal
        visible={isModalOpen}
        client={editingClient}
        onClose={closeModal}
        onSubmit={handleSubmitClient}
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
    paddingBottom: 24,
  },
  headerColumn: {
    flexDirection: 'column',
    gap: 12,
    padding: 16,
    marginTop: 20,
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
  topActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 10,
  },
  createButtonText: {
    color: color.black,
    fontSize: 15,
    fontWeight: '500',
  },
  list: {
    gap: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.slate10,
    padding: 16,
    gap: 12,
  },
  cardContent: {
    flex: 1,
    gap: 6,
  },
  clientName: {
    color: color.black,
    fontSize: 18,
    fontWeight: '400',
  },
  clientPhone: {
    color: color.slate500,
    fontSize: 16,
    fontWeight: '400',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
