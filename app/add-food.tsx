import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/theme/colors";
import { Spacing } from "@/theme/spacing";
import { Radii } from "@/theme/radii";
import { FontFamily } from "@/theme/fonts";
import { useInventory } from "@/lib/inventory";
import type { FoodCategory } from "@/lib/types";

const CATEGORIES: { value: FoodCategory; label: string }[] = [
  { value: "produce", label: "Produce" },
  { value: "dairy", label: "Dairy" },
  { value: "meat", label: "Meat" },
  { value: "seafood", label: "Seafood" },
  { value: "frozen", label: "Frozen" },
  { value: "pantry", label: "Pantry" },
  { value: "beverages", label: "Beverages" },
  { value: "condiments", label: "Condiments" },
  { value: "snacks", label: "Snacks" },
  { value: "other", label: "Other" },
];

export default function AddFoodScreen() {
  const router = useRouter();
  const { addFood } = useInventory();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<FoodCategory>("other");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expiryDays, setExpiryDays] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;

    const days = parseInt(expiryDays, 10) || 7;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    expiryDate.setHours(23, 59, 59, 999);

    addFood({
      name: name.trim(),
      category,
      quantity: quantity.trim() || "1",
      unit: unit.trim() || "",
      expiryDate,
    });

    router.back();
  };

  const isValid = name.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.onSurface} />
          </Pressable>
          <Text style={styles.title}>Add Food</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.field}>
            <Text style={styles.label}>Food Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., Greek Yogurt"
              placeholderTextColor={Colors.onSurfaceVariant}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.value}
                  onPress={() => setCategory(cat.value)}
                  style={[
                    styles.categoryChip,
                    category === cat.value && styles.categoryChipSelected,
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: category === cat.value }}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat.value && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.field, styles.halfWidth]}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="e.g., 2"
                placeholderTextColor={Colors.onSurfaceVariant}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.field, styles.halfWidth]}>
              <Text style={styles.label}>Unit</Text>
              <TextInput
                style={styles.input}
                value={unit}
                onChangeText={setUnit}
                placeholder="e.g., packs"
                placeholderTextColor={Colors.onSurfaceVariant}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Expires in (days)</Text>
            <TextInput
              style={styles.input}
              value={expiryDays}
              onChangeText={setExpiryDays}
              placeholder="7"
              placeholderTextColor={Colors.onSurfaceVariant}
              keyboardType="numeric"
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            onPress={handleSave}
            disabled={!isValid}
            style={({ pressed }) => [
              styles.saveButton,
              !isValid && styles.saveButtonDisabled,
              pressed && isValid && styles.saveButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isValid }}
          >
            <MaterialIcons
              name="add"
              size={24}
              color={isValid ? Colors.onPrimary : Colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.saveButtonText,
                !isValid && styles.saveButtonTextDisabled,
              ]}
            >
              Add to Inventory
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboard: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.containerMargin,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: Spacing.containerMargin,
    paddingTop: Spacing.lg,
    paddingBottom: 120,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 1,
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
    backgroundColor: Colors.surfaceContainerLowest,
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
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  categoryChipSelected: {
    backgroundColor: Colors.primaryContainer,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    color: Colors.onSurfaceVariant,
  },
  categoryChipTextSelected: {
    color: Colors.onPrimaryContainer,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.containerMargin,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
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
  saveButtonDisabled: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderColor: Colors.outlineVariant,
  },
  saveButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  saveButtonText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onPrimary,
  },
  saveButtonTextDisabled: {
    color: Colors.onSurfaceVariant,
  },
});