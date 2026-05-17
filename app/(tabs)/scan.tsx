import { EatByHeader } from "@/components/eatby";
import { useInventory } from "@/lib/inventory";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Radii } from "@/theme/radii";
import { Spacing } from "@/theme/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Scan() {
  const { addFood } = useInventory();

  const [name, setName] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [deadline, setDeadline] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(23, 59, 59, 999);
    return d;
  });
  const [showDate, setShowDate] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return;

    addFood({
      name: name.trim(),
      expiryDate: deadline,
    });

    setAdded(true);
    setTimeout(() => {
      setName("");
      const d = new Date();
      d.setDate(d.getDate() + 7);
      d.setHours(23, 59, 59, 999);
      setDeadline(d);
      setAdded(false);
    }, 1500);
  };

  const isValid = name.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <EatByHeader variant="scan" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scanner}>
          <View style={styles.scannerBg} />
          <View style={styles.scannerOverlayTop} />
          <View style={styles.scannerOverlayBottom} />
          <View style={styles.target} />
          <View style={styles.scanLine} />
          <View style={styles.alignPill}>
            <Text style={styles.alignPillText}>ALIGN BARCODE WITHIN BOX</Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Add New Item</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Product Name</Text>
            <View style={styles.inputWrap}>
              <TextInput
                value={name}
                onChangeText={setName}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                style={[styles.input, nameFocused && styles.inputFocused]}
                placeholderTextColor={Colors.outline}
              />
              <MaterialIcons
                name="check-circle"
                size={22}
                color={Colors.primary}
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Expiry Date</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowDate(true)}
              style={styles.dateCard}
            >
              <View style={styles.dateRow}>
                <MaterialIcons
                  name="calendar-today"
                  size={22}
                  color={Colors.primary}
                  style={{ marginRight: Spacing.sm }}
                />
                <Text style={styles.dateText}>{deadline.toLocaleDateString("en-GB")}</Text>
              </View>
            </Pressable>
            {showDate ? (
              <DateTimePicker
                value={deadline}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(ev, d) => {
                  if (Platform.OS === "android") {
                    setShowDate(false);
                  }
                  if (d) setDeadline(d);
                }}
              />
            ) : null}
            {showDate && Platform.OS === "ios" ? (
              <Pressable
                style={styles.dateDone}
                onPress={() => setShowDate(false)}
              >
                <Text style={styles.dateDoneText}>Done</Text>
              </Pressable>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={!isValid || added}
            onPress={handleAdd}
            style={({ pressed }) => [
              styles.primaryBtn,
              !isValid && styles.primaryBtnDisabled,
              pressed && isValid && !added && { opacity: 0.92 },
            ]}
          >
            <MaterialIcons
              name={added ? "check" : "playlist-add"}
              size={22}
              color={Colors.onPrimary}
            />
            <Text style={styles.primaryBtnText}>
              {added ? "Added to Inventory" : "Add to Inventory"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SCAN_H = 288;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingBottom: 100,
  },
  scanner: {
    height: SCAN_H,
    backgroundColor: "#000000",
    position: "relative",
    overflow: "hidden",
  },
  scannerBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#1a1f1c",
    opacity: 0.85,
  },
  scannerOverlayTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "25%",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  scannerOverlayBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "25%",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  target: {
    position: "absolute",
    width: 240,
    height: 160,
    borderRadius: Radii.lg,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.85)",
    top: "50%",
    left: "50%",
    marginLeft: -120,
    marginTop: -80,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    top: "50%",
    marginTop: -1,
    backgroundColor: Colors.primaryContainer,
  },
  alignPill: {
    position: "absolute",
    bottom: Spacing.sm,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  alignPillText: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
    color: Colors.onPrimary,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  form: {
    paddingHorizontal: Spacing.containerMargin,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  formTitle: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    color: Colors.onSurface,
    marginBottom: Spacing.xs,
  },
  field: {
    gap: Spacing.xs,
  },
  label: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.onSurfaceVariant,
    textTransform: "uppercase",
  },
  inputWrap: {
    position: "relative",
  },
  input: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurface,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outline,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingRight: 44,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  inputIcon: {
    position: "absolute",
    right: Spacing.sm,
    top: "50%",
    marginTop: -11,
  },
  dateCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outline,
    borderRadius: Radii.lg,
    overflow: "hidden",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.sm,
    backgroundColor: Colors.surfaceContainerLow,
  },
  dateText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    color: Colors.onSurface,
  },
  dateDone: {
    alignSelf: "flex-end",
    marginTop: Spacing.xs,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  dateDoneText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    color: Colors.primary,
  },
  row2: {
    flexDirection: "row",
    gap: Spacing.sm,
    alignItems: "flex-start",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.outline,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    height: 48,
    overflow: "hidden",
  },
  stepperSide: {
    paddingHorizontal: Spacing.sm,
    height: "100%",
    justifyContent: "center",
  },
  stepperSideLeft: {
    borderRightWidth: 1,
    borderRightColor: Colors.outlineVariant,
  },
  stepperSideRight: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.outlineVariant,
  },
  stepperBtnText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "700",
  },
  stepperVal: {
    flex: 1,
    textAlign: "center",
    fontFamily: FontFamily.monoMedium,
    fontSize: 14,
    color: Colors.onSurface,
  },
  storageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.xs,
  },
  storageChip: {
    borderWidth: 1,
    borderColor: Colors.outline,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.surfaceContainerLowest,
    flexGrow: 1,
    minWidth: "28%",
  },
  storageChipOn: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.surfaceContainerLow,
  },
  storageChipText: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 14,
    color: Colors.onSurface,
    textAlign: "center",
  },
  storageChipTextOn: {
    fontWeight: "600",
    color: Colors.primary,
  },
  primaryBtn: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radii.lg,
  },
  primaryBtnDisabled: {
    backgroundColor: Colors.surfaceContainerHigh,
  },
  primaryBtnText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    color: Colors.onPrimary,
    marginLeft: Spacing.sm,
  },
});
