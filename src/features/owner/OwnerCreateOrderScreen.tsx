import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { color } from '../../styles/appStyles';
import { OwnerClient, OwnerClientDraft, OwnerOrderDraft } from '../../types/fieldOps';
import { CreateUserIcon } from 'src/components/common/icons';
import { OwnerClientModal } from './components/OwnerClientModal';

type OwnerCreateOrderScreenProps = {
  clients: OwnerClient[];
  editingOrderId: string | null;
  initialDraft: OwnerOrderDraft | null;
  isEditing: boolean;
  onBack: () => void;
  onCreateOrder: (draft: OwnerOrderDraft) => void;
  onCreateClient: (draft: OwnerClientDraft) => void;
  onUpdateOrder: (orderId: string, draft: OwnerOrderDraft) => void;
};

type CustomerOption = {
  id: string;
  name: string;
};

type OwnerCreateOrderForm = {
  customerQuery: string;
  customerId: string;
  selectedCustomerName: string;
  selectedDesigner: string;
  measurementDate: string;
  plannedCompletion: string;
  installationCity: string;
  installationStreet: string;
  installationBuilding: string;
  installationApartment: string;
  installationNotes: string;
};

const emptyForm: OwnerCreateOrderForm = {
  customerQuery: '',
  customerId: '',
  selectedCustomerName: '',
  selectedDesigner: '',
  measurementDate: '',
  plannedCompletion: '',
  installationCity: '',
  installationStreet: '',
  installationBuilding: '',
  installationApartment: '',
  installationNotes: '',
};

const DESIGNER_OPTIONS = ['Анна Смирнова', 'Игорь Петров', 'Мария Ким'];

export const OwnerCreateOrderScreen: React.FC<OwnerCreateOrderScreenProps> = ({
  clients,
  editingOrderId,
  initialDraft,
  isEditing,
  onBack,
  onCreateOrder,
  onCreateClient,
  onUpdateOrder,
}) => {
  const [form, setForm] = useState<OwnerCreateOrderForm>(() => {
    if (!initialDraft) {
      return emptyForm;
    }

    return {
      customerQuery: initialDraft.customerName,
      customerId: initialDraft.customerId,
      selectedCustomerName: initialDraft.customerName,
      selectedDesigner: initialDraft.selectedDesigner,
      measurementDate: initialDraft.measurementDate,
      plannedCompletion: initialDraft.plannedCompletion,
      installationCity: initialDraft.installationCity,
      installationStreet: initialDraft.installationStreet,
      installationBuilding: initialDraft.installationBuilding,
      installationApartment: initialDraft.installationApartment,
      installationNotes: initialDraft.installationNotes,
    };
  });
  const [openDropdown, setOpenDropdown] = useState<'customer' | 'designer' | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  useEffect(() => {
    if (!initialDraft) {
      setForm(emptyForm);
      return;
    }

    setForm({
      customerQuery: initialDraft.customerName,
      customerId: initialDraft.customerId,
      selectedCustomerName: initialDraft.customerName,
      selectedDesigner: initialDraft.selectedDesigner,
      measurementDate: initialDraft.measurementDate,
      plannedCompletion: initialDraft.plannedCompletion,
      installationCity: initialDraft.installationCity,
      installationStreet: initialDraft.installationStreet,
      installationBuilding: initialDraft.installationBuilding,
      installationApartment: initialDraft.installationApartment,
      installationNotes: initialDraft.installationNotes,
    });
  }, [initialDraft]);

  const customerOptions: CustomerOption[] = clients.map(client => ({
    id: client.id,
    name: client.fullName,
  }));

  const customerSearchResults = customerOptions.filter(customer => {
    const query = form.customerQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return customer.name.toLowerCase().includes(query);
  });

  const updateForm = (patch: Partial<OwnerCreateOrderForm>) => {
    setForm(currentForm => ({ ...currentForm, ...patch }));
  };

  const selectCustomer = (customer: CustomerOption) => {
    updateForm({
      customerId: customer.id,
      customerQuery: customer.name,
      selectedCustomerName: customer.name,
    });
    setOpenDropdown(null);
  };

  const selectDesigner = (designer: string) => {
    updateForm({ selectedDesigner: designer });
    setOpenDropdown(null);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const openClientModal = () => {
    setOpenDropdown(null);
    setIsClientModalOpen(true);
  };

  const closeClientModal = () => {
    setIsClientModalOpen(false);
  };

  const handleCreateClient = (draft: OwnerClientDraft) => {
    onCreateClient(draft);

    const fullName = draft.fullName.trim();
    if (!fullName) {
      return;
    }

    updateForm({
      customerQuery: fullName,
      customerId: '',
      selectedCustomerName: fullName,
    });
  };

  const handleSave = () => {
    const draft: OwnerOrderDraft = {
      customerId: form.customerId,
      customerName: form.selectedCustomerName,
      selectedDesigner: form.selectedDesigner,
      measurementDate: form.measurementDate,
      plannedCompletion: form.plannedCompletion,
      installationCity: form.installationCity,
      installationStreet: form.installationStreet,
      installationBuilding: form.installationBuilding,
      installationApartment: form.installationApartment,
      installationNotes: form.installationNotes,
    };

    if (isEditing && editingOrderId) {
      onUpdateOrder(editingOrderId, draft);
      return;
    }

    onCreateOrder(draft);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.headerColumn}>
          <Pressable onPress={onBack}>
            <Text style={styles.backButtonText}>Назад</Text>
          </Pressable>
          <Text style={styles.title}>{isEditing ? 'Редактирование заказа' : 'Создание заказа'}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              1. Клиент <Text style={styles.requiredMark}>*</Text>
            </Text>
            <View style={styles.searchRow}>
              <TextInput
                style={[styles.input, styles.searchInput]}
                value={form.customerQuery}
                onChangeText={text => {
                  updateForm({ customerQuery: text, customerId: '', selectedCustomerName: text });
                  setOpenDropdown('customer');
                }}
                placeholder="Поиск клиента"
                placeholderTextColor="#747474"
                onFocus={() => setOpenDropdown('customer')}
              />
              <Pressable onPress={openClientModal}>
                <CreateUserIcon />
              </Pressable>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>2. Дизайнер</Text>
            <Pressable
              style={styles.selectTrigger}
              onPress={() =>
                setOpenDropdown(current => (current === 'designer' ? null : 'designer'))
              }
            >
              <Text style={styles.selectTriggerText}>
                {form.selectedDesigner || 'Выберите дизайнера'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldGroupHalf}>
              <Text style={styles.label}>3. Дата замер</Text>
              <TextInput
                style={styles.input}
                value={form.measurementDate}
                onChangeText={text => updateForm({ measurementDate: text })}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#747474"
              />
            </View>

            <View style={styles.fieldGroupHalf}>
              <Text style={styles.label}>4. Завершение</Text>
              <TextInput
                style={styles.input}
                value={form.plannedCompletion}
                onChangeText={text => updateForm({ plannedCompletion: text })}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#747474"
              />
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>5. Адрес установки</Text>

            <View style={styles.fieldRow}>
              <View style={styles.fieldGroupHalf}>
                <TextInput
                  style={styles.input}
                  value={form.installationCity}
                  placeholder="Город"
                  onChangeText={text => updateForm({ installationCity: text })}
                  placeholderTextColor="#747474"
                />
              </View>
              <View style={styles.fieldGroupHalf}>
                <TextInput
                  style={styles.input}
                  value={form.installationStreet}
                  onChangeText={text => updateForm({ installationStreet: text })}
                  placeholder="Улица"
                  placeholderTextColor="#747474"
                />
              </View>
            </View>

            <View style={styles.fieldRow}>
              <View style={styles.fieldGroupHalf}>
                <TextInput
                  style={styles.input}
                  value={form.installationBuilding}
                  onChangeText={text => updateForm({ installationBuilding: text })}
                  placeholder="Дом"
                  placeholderTextColor="#747474"
                />
              </View>

              <View style={styles.fieldGroupHalf}>
                <TextInput
                  style={styles.input}
                  value={form.installationApartment}
                  onChangeText={text => updateForm({ installationApartment: text })}
                  placeholder="Квартира"
                  placeholderTextColor="#747474"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.installationNotes}
                onChangeText={text => updateForm({ installationNotes: text })}
                placeholder="Примечание"
                placeholderTextColor="#747474"
              />
            </View>
          </View>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </Pressable>
        </View>
      </ScrollView>

      {openDropdown !== null ? (
        <View style={styles.dropdownOverlay} pointerEvents="box-none">
          <Pressable style={styles.dropdownBackdrop} onPress={closeDropdown} />

          <View
            style={[
              styles.dropdownModalCard,
              openDropdown === 'customer'
                ? styles.dropdownModalCardCustomer
                : styles.dropdownModalCardDesigner,
            ]}
          >
            {openDropdown === 'customer' ? (
              <View style={[styles.dropdownSection, styles.dropdownSectionCustomer]}>
                <View style={styles.dropdownList}>
                  {customerSearchResults.map(customer => {
                    const active = form.customerId === customer.id;

                    return (
                      <Pressable
                        key={customer.id}
                        style={[
                          styles.customerResultItem,
                          active && styles.customerResultItemActive,
                        ]}
                        onPress={() => selectCustomer(customer)}
                      >
                        <Text
                          style={[
                            styles.customerResultText,
                            active && styles.customerResultTextActive,
                          ]}
                        >
                          {customer.name}
                        </Text>
                        <Text
                          style={[
                            styles.customerResultCaption,
                            active && styles.customerResultCaptionActive,
                          ]}
                        >
                          customer_id: {customer.id}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {openDropdown === 'designer' ? (
              <View style={[styles.dropdownSection, styles.dropdownSectionDesigner]}>
                <View style={styles.dropdownList}>
                  {DESIGNER_OPTIONS.map(designer => {
                    const active = form.selectedDesigner === designer;

                    return (
                      <Pressable
                        key={designer}
                        style={[styles.selectOption, active && styles.selectOptionActive]}
                        onPress={() => selectDesigner(designer)}
                      >
                        <Text
                          style={[styles.selectOptionText, active && styles.selectOptionTextActive]}
                        >
                          {designer}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}

      <OwnerClientModal
        visible={isClientModalOpen}
        onClose={closeClientModal}
        onSubmit={handleCreateClient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 16,
    paddingBottom: 32,
  },
  headerColumn: {
    gap: 12,
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
  card: {
    backgroundColor: color.white,
    padding: 16,
    gap: 20,
  },
  fieldGroup: {
    gap: 12,
  },
  fieldGroupHalf: {
    flex: 1,
    gap: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sectionBlock: {
    gap: 12,
    paddingTop: 4,
  },
  sectionTitle: {
    color: color.black,
    fontSize: 18,
    fontWeight: '400',
  },
  label: {
    color: color.black,
    fontSize: 18,
    fontWeight: '400',
  },
  requiredMark: {
    color: color.red,
  },
  input: {
    borderWidth: 1,
    borderColor: color.slate,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: color.slate,
    color: color.black,
    fontSize: 16,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
  },
  addClientButtonText: {
    color: color.white,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '600',
  },
  customerResults: {
    gap: 8,
  },
  customerResultItem: {
    borderWidth: 1,
    borderColor: color.slate,
    borderRadius: 12,
    padding: 12,
    backgroundColor: color.slate,
  },
  customerResultItemActive: {
    borderColor: color.blue600,
    backgroundColor: color.slate50,
  },
  customerResultText: {
    color: color.black,
    fontSize: 15,
    fontWeight: '600',
  },
  customerResultTextActive: {
    color: color.blue700,
  },
  customerResultCaption: {
    color: color.slate500,
    fontSize: 12,
    marginTop: 2,
  },
  customerResultCaptionActive: {
    color: color.blue600,
  },
  selectList: {
    gap: 8,
  },
  selectTrigger: {
    borderWidth: 1,
    borderColor: color.slate,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: color.slate,
  },
  selectTriggerText: {
    color: color.black,
    fontSize: 16,
    fontWeight: '400',
  },
  dropdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 140,
  },
  dropdownBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  dropdownModalCard: {
    backgroundColor: color.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.slate200,
    padding: 12,
    shadowColor: color.black,
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 12,
  },
  dropdownModalCardCustomer: {
    marginTop: 86,
  },
  dropdownModalCardDesigner: {
    marginTop: 196,
  },
  dropdownSection: {
    gap: 10,
  },
  dropdownSectionCustomer: {
    paddingTop: 0,
  },
  dropdownSectionDesigner: {
    paddingTop: 0,
  },
  dropdownTitle: {
    color: color.slate900,
    fontSize: 14,
    fontWeight: '600',
  },
  dropdownList: {
    gap: 8,
  },
  selectOption: {
    borderWidth: 1,
    borderColor: color.slate,
    borderRadius: 12,
    padding: 12,
    backgroundColor: color.slate,
  },
  selectOptionActive: {
    borderColor: color.blue600,
    backgroundColor: color.slate50,
  },
  selectOptionText: {
    color: color.black,
    fontSize: 15,
    fontWeight: '500',
  },
  selectOptionTextActive: {
    color: color.blue700,
  },
  saveButton: {
    marginTop: 6,
    backgroundColor: color.blue600,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
