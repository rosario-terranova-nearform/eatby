import { EatByHeader } from "@/components/eatby";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Radii } from "@/theme/radii";
import { Spacing } from "@/theme/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ALERT_OPTIONS = [
  "1 day before expiry",
  "2 days before expiry",
  "3 days before expiry",
  "1 week before expiry",
] as const;

export default function Settings() {
  const [alertIdx, setAlertIdx] = useState(1);
  const [pushOn, setPushOn] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <EatByHeader variant="settings" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notifications</Text>
          <View style={styles.card}>
            <View style={[styles.cardRow, styles.cardRowBorder]}>
              <Text style={styles.rowTitle}>Alert Timing</Text>
              <View style={styles.selectWrap}>
                {ALERT_OPTIONS.map((opt, i) => (
                  <Pressable
                    key={opt}
                    accessibilityRole="button"
                    accessibilityState={{ selected: alertIdx === i }}
                    onPress={() => setAlertIdx(i)}
                    style={[
                      styles.selectOption,
                      alertIdx === i && styles.selectOptionOn,
                    ]}
                  >
                    <Text
                      style={[
                        styles.selectOptionText,
                        alertIdx === i && styles.selectOptionTextOn,
                      ]}
                    >
                      {opt}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={styles.cardRowBetween}>
              <View style={{ flex: 1, paddingRight: Spacing.sm }}>
                <Text style={styles.rowTitle}>Push Notifications</Text>
                <Text style={styles.rowSub}>
                  Immediate alerts on your device
                </Text>
              </View>
              <Pressable
                accessibilityRole="switch"
                accessibilityState={{ checked: pushOn }}
                onPress={() => setPushOn((v) => !v)}
                style={[styles.toggle, pushOn && styles.toggleOn]}
              >
                <View
                  style={[styles.toggleKnob, pushOn && styles.toggleKnobOn]}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>App Information</Text>
          <View style={styles.card}>
            <View style={[styles.cardRowBetween, styles.cardRowBorder]}>
              <Text style={styles.rowTitlePlain}>Version</Text>
              <Text style={styles.monoMeta}>
                {Constants.expoConfig?.version ?? "n/a"} (Stable)
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.cardRowBetween,
                pressed && { backgroundColor: Colors.surfaceContainerLow },
              ]}
            >
              <Text style={styles.rowTitle}>About EatBy</Text>
              <MaterialIcons name="info" size={22} color={Colors.outline} />
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerMark}>
            <MaterialIcons
              name="inventory-2"
              size={40}
              color={Colors.outline}
            />
          </View>
          <Text style={styles.footerCaption}>
            Professional Inventory Control
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: Spacing.containerMargin,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    maxWidth: 560,
    alignSelf: "center",
    width: "100%",
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.outline,
    textTransform: "uppercase",
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.default,
    overflow: "hidden",
  },
  cardRow: {
    padding: Spacing.sm,
  },
  cardRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  cardRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.sm,
  },
  rowTitle: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurface,
    marginBottom: Spacing.xs,
  },
  rowTitlePlain: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurface,
  },
  rowSub: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.onSurfaceVariant,
  },
  selectWrap: {
    gap: Spacing.xs,
  },
  selectOption: {
    borderWidth: 1,
    borderColor: Colors.outline,
    borderRadius: Radii.default,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  selectOptionOn: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.surfaceContainerLow,
  },
  selectOptionText: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurface,
  },
  selectOptionTextOn: {
    fontWeight: "600",
    color: Colors.primary,
  },
  monoMeta: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.onSurfaceVariant,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surfaceVariant,
    padding: 2,
    justifyContent: "center",
  },
  toggleOn: {
    backgroundColor: Colors.primaryContainer,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerLowest,
    alignSelf: "flex-start",
  },
  toggleKnobOn: {
    alignSelf: "flex-end",
  },
  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    alignItems: "center",
    opacity: 0.45,
  },
  footerMark: {
    marginBottom: Spacing.xs,
  },
  footerCaption: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.outline,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
