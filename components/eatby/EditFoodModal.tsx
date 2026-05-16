import type { Food } from "@/lib/types";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Radii } from "@/theme/radii";
import { Spacing } from "@/theme/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface EditFoodModalProps {
  visible: boolean;
  food: Food | null;
  onClose: () => void;
  onSave: (updates: Partial<Omit<Food, "id" | "addedAt">>) => void;
  onDelete: () => void;
}

export function EditFoodModal({
  visible,
  food,
  onClose,
  onSave,
  onDelete,
}: EditFoodModalProps) {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (food) {
      setName(food.name);
      setExpiryDate(new Date(food.expiryDate));
    }
  }, [food]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      expiryDate,
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  if (!food) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoid}
            >
              <SafeAreaView style={styles.sheet}>
                <View style={styles.handle} />

                <View style={styles.header}>
                  <Text style={styles.title}>Edit Item</Text>
                  <Pressable
                    onPress={onClose}
                    style={styles.closeButton}
                    accessibilityRole="button"
                    accessibilityLabel="Close"
                  >
                    <MaterialIcons
                      name="close"
                      size={24}
                      color={Colors.onSurfaceVariant}
                    />
                  </Pressable>
                </View>

                <View style={styles.content}>
                  <View style={styles.field}>
                    <Text style={styles.label}>Food Name</Text>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder="Enter food name"
                      placeholderTextColor={Colors.onSurfaceVariant}
                      autoCapitalize="words"
                    />
                  </View>

                  <View style={styles.field}>
                    <Text style={styles.label}>Expiry Date</Text>
                    <Pressable
                      style={styles.dateButton}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <MaterialIcons
                        name="calendar-today"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={styles.dateText}>
                        {expiryDate.toDateString()}
                      </Text>
                    </Pressable>
                    {showDatePicker && (
                      <DateTimePicker
                        value={expiryDate}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(ev, date) => {
                          if (Platform.OS === "android") {
                            setShowDatePicker(false);
                          }
                          if (date) setExpiryDate(date);
                        }}
                        minimumDate={new Date()}
                      />
                    )}
                    {showDatePicker && Platform.OS === "ios" && (
                      <Pressable
                        style={styles.dateDone}
                        onPress={() => setShowDatePicker(false)}
                      >
                        <Text style={styles.dateDoneText}>Done</Text>
                      </Pressable>
                    )}
                  </View>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.saveButton,
                      pressed && styles.buttonPressed,
                    ]}
                    onPress={handleSave}
                  >
                    <MaterialIcons
                      name="check"
                      size={20}
                      color={Colors.onPrimary}
                    />
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [
                      styles.deleteButton,
                      pressed && styles.buttonPressed,
                    ]}
                    onPress={handleDelete}
                  >
                    <MaterialIcons
                      name="delete"
                      size={20}
                      color={Colors.error}
                    />
                    <Text style={styles.deleteButtonText}>Delete Item</Text>
                  </Pressable>
                </View>
              </SafeAreaView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  keyboardAvoid: {
    width: "100%",
  },
  sheet: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderBottomWidth: 0,
    paddingBottom: Spacing.xl,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.outlineVariant,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.containerMargin,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  title: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: Spacing.containerMargin,
    paddingTop: Spacing.lg,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: Colors.onSurfaceVariant,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.default,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurface,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.default,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  dateText: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurface,
  },
  dateDone: {
    alignSelf: "flex-end",
    marginTop: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  dateDoneText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    color: Colors.primary,
  },
  actions: {
    paddingHorizontal: Spacing.containerMargin,
    paddingTop: Spacing.lg,
    gap: Spacing.sm,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radii.full,
    paddingVertical: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.onPrimaryContainer,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radii.full,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  saveButtonText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onPrimary,
  },
  deleteButtonText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.error,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
