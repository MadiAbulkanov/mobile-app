import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CaretDownIcon } from 'src/components/common/icons';

import { color } from '../../styles/appStyles';

type DesignerCreateMeasurementScreenProps = {
  editingMeasurementId: string | null;
  initialDraft: {
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
  } | null;
  isEditing: boolean;
  onBack: () => void;
  onCreate: (draft: {
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
  }) => void;
  onUpdate: (
    measurementId: string,
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
    }
  ) => void;
};

const CURTAIN_FABRIC_OPTIONS = ['Блэкаут', 'Лен', 'Велюр', 'Рогожка'];
const TULLE_FABRIC_OPTIONS = ['Вуаль', 'Органза', 'Сетка'];
const MOUNT_OPTIONS = ['Потолочное', 'Стеновое', 'Скрытое'];

export const DesignerCreateMeasurementScreen: React.FC<DesignerCreateMeasurementScreenProps> = ({
  editingMeasurementId,
  initialDraft,
  isEditing,
  onBack,
  onCreate,
  onUpdate,
}) => {
  const [room, setRoom] = useState(initialDraft?.room ?? '');
  const [product, setProduct] = useState(initialDraft?.product ?? '');
  const [width, setWidth] = useState(initialDraft?.width ?? '');
  const [height, setHeight] = useState(initialDraft?.height ?? '');
  const [curtainFabric, setCurtainFabric] = useState(initialDraft?.curtainFabric ?? '');
  const [curtainCentimeter, setCurtainCentimeter] = useState(initialDraft?.curtainCentimeter ?? '');
  const [tulleFabric, setTulleFabric] = useState(initialDraft?.tulleFabric ?? '');
  const [tulleCentimeter, setTulleCentimeter] = useState(initialDraft?.tulleCentimeter ?? '');
  const [mountType, setMountType] = useState(initialDraft?.mountType ?? '');
  const [note, setNote] = useState(initialDraft?.note ?? '');
  const [openSelect, setOpenSelect] = useState<'curtain' | 'tulle' | 'mount' | null>(null);

  const handleCreate = () => {
    const draft = {
      room,
      product,
      width,
      height,
      curtainFabric,
      curtainCentimeter,
      tulleFabric,
      tulleCentimeter,
      mountType,
      note,
    };

    if (isEditing && editingMeasurementId) {
      onUpdate(editingMeasurementId, draft);
      return;
    }

    onCreate(draft);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.headerColumn}>
          <Pressable onPress={onBack}>
            <Text style={styles.backButtonText}>Назад</Text>
          </Pressable>
          <Text style={styles.title}>{isEditing ? 'Редактирование замера' : 'Создание замера'}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              1. Комната <Text style={styles.requiredMark}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={room}
              onChangeText={setRoom}
              placeholder="Например: Гостиная"
              placeholderTextColor="#747474"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              2. Окно/изделие <Text style={styles.requiredMark}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={product}
              onChangeText={setProduct}
              placeholder="Например: Окно 1"
              placeholderTextColor="#747474"
            />
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldGroupHalf}>
              <Text style={styles.label}>
                3. Ширина (см) <Text style={styles.requiredMark}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={width}
                onChangeText={setWidth}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#747474"
              />
            </View>
            <View style={styles.fieldGroupHalf}>
              <Text style={styles.label}>
                4. Высота (см) <Text style={styles.requiredMark}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#747474"
              />
            </View>
          </View>

          <View style={styles.fieldRow}>
            <View style={[styles.fieldGroup, styles.fabricSelectColumn]}>
              <Text style={styles.label}>5. Ткань штор</Text>
              <View style={styles.selectRow}>
                <Pressable
                  style={[styles.selectTrigger, styles.selectTriggerInRow]}
                  onPress={() =>
                    setOpenSelect(current => (current === 'curtain' ? null : 'curtain'))
                  }
                >
                  <Text style={styles.selectTriggerText}>{curtainFabric || 'Выберите ткань'}</Text>
                  <CaretDownIcon currentColor={color.slate500} />
                </Pressable>
              </View>
              {openSelect === 'curtain' ? (
                <View style={styles.selectList}>
                  {CURTAIN_FABRIC_OPTIONS.map(option => (
                    <Pressable
                      key={option}
                      style={styles.selectOption}
                      onPress={() => {
                        setCurtainFabric(option);
                        setOpenSelect(null);
                      }}
                    >
                      <Text style={styles.selectOptionText}>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
            <View style={[styles.fieldGroup, styles.centimeterColumn]}>
              <Text style={styles.label}>Сантиметры</Text>
              <TextInput
                style={[styles.input, styles.cmInput]}
                value={curtainCentimeter}
                onChangeText={setCurtainCentimeter}
                keyboardType="numeric"
                placeholderTextColor="#747474"
              />
            </View>
          </View>

          <View style={styles.fieldRow}>
            <View style={[styles.fieldGroup, styles.fabricSelectColumn]}>
              <Text style={styles.label}>6. Ткань тюля</Text>
              <View style={styles.selectRow}>
                <Pressable
                  style={[styles.selectTrigger, styles.selectTriggerInRow]}
                  onPress={() => setOpenSelect(current => (current === 'tulle' ? null : 'tulle'))}
                >
                  <Text style={styles.selectTriggerText}>{tulleFabric || 'Выберите ткань'}</Text>
                  <CaretDownIcon currentColor={color.slate500} />
                </Pressable>
              </View>
              {openSelect === 'tulle' ? (
                <View style={styles.selectList}>
                  {TULLE_FABRIC_OPTIONS.map(option => (
                    <Pressable
                      key={option}
                      style={styles.selectOption}
                      onPress={() => {
                        setTulleFabric(option);
                        setOpenSelect(null);
                      }}
                    >
                      <Text style={styles.selectOptionText}>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
            <View style={[styles.fieldGroup, styles.centimeterColumn]}>
              <Text style={styles.label}>Сантиметры</Text>
              <TextInput
                style={[styles.input, styles.cmInput]}
                value={tulleCentimeter}
                onChangeText={setTulleCentimeter}
                keyboardType="numeric"
                placeholderTextColor="#747474"
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>7. Тип крепления</Text>
            <Pressable
              style={styles.selectTrigger}
              onPress={() => setOpenSelect(current => (current === 'mount' ? null : 'mount'))}
            >
              <Text style={styles.selectTriggerText}>{mountType || 'Выберите крепление'}</Text>
              <CaretDownIcon currentColor={color.slate500} />
            </Pressable>
            {openSelect === 'mount' ? (
              <View style={styles.selectList}>
                {MOUNT_OPTIONS.map(option => (
                  <Pressable
                    key={option}
                    style={styles.selectOption}
                    onPress={() => {
                      setMountType(option);
                      setOpenSelect(null);
                    }}
                  >
                    <Text style={styles.selectOptionText}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>8. Комментарии по изделию</Text>
            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Примечание"
              placeholderTextColor="#747474"
            />
          </View>

          <Pressable style={styles.saveButton} onPress={handleCreate}>
            <Text style={styles.saveButtonText}>{isEditing ? 'Сохранить' : 'Создать'}</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  fabricSelectColumn: {
    flex: 2,
  },
  centimeterColumn: {
    flex: 1,
  },
  fieldGroupHalf: {
    flex: 1,
    gap: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  selectTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: color.slate,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: color.slate,
  },
  selectTriggerInRow: {
    width: '100%',
  },
  cmInput: {
    width: '100%',
  },
  selectTriggerText: {
    color: color.black,
    fontSize: 16,
    fontWeight: '400',
  },
  selectList: {
    gap: 8,
  },
  selectOption: {
    borderWidth: 1,
    borderColor: color.slate,
    borderRadius: 12,
    padding: 12,
    backgroundColor: color.slate,
  },
  selectOptionText: {
    color: color.black,
    fontSize: 15,
    fontWeight: '500',
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
