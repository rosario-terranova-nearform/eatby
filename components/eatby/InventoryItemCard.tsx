import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";
import { Spacing } from "@/theme/spacing";
import { Radii } from "@/theme/radii";
import { FontFamily } from "@/theme/fonts";

export type InventoryUrgency = "critical" | "warning" | "safe";

export type InventoryItemCardProps = {
  title: string;
  meta: string;
  pillLabel: string;
  expiryCaption: string;
  urgency: InventoryUrgency;
};

const barColor: Record<InventoryUrgency, string> = {
  critical: Colors.secondary,
  warning: Colors.tertiary,
  safe: Colors.primary,
};

const pillStyle: Record<
  InventoryUrgency,
  { text: string; bg: string; border: string }
> = {
  critical: {
    text: Colors.secondary,
    bg: Colors.secondaryFixed,
    border: Colors.secondary,
  },
  warning: {
    text: Colors.onTertiaryContainer,
    bg: Colors.tertiaryFixed,
    border: Colors.tertiary,
  },
  safe: {
    text: Colors.onPrimaryContainer,
    bg: Colors.primaryFixed,
    border: Colors.primary,
  },
};

export function InventoryItemCard({
  title,
  meta,
  pillLabel,
  expiryCaption,
  urgency,
}: InventoryItemCardProps) {
  const pill = pillStyle[urgency];
  return (
    <View style={styles.card}>
      <View style={[styles.bar, { backgroundColor: barColor[urgency] }]} />
      <View style={styles.body}>
        <View style={styles.colLeft}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.meta}>{meta}</Text>
        </View>
        <View style={styles.colRight}>
          <Text
            style={[
              styles.pill,
              {
                color: pill.text,
                backgroundColor: pill.bg,
                borderColor: pill.border,
              },
            ]}
          >
            {pillLabel}
          </Text>
          <Text style={styles.expiry}>{expiryCaption}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.lg,
    overflow: "hidden",
  },
  bar: {
    width: 4,
    alignSelf: "stretch",
  },
  body: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  colLeft: {
    flex: 1,
    minWidth: 0,
  },
  colRight: {
    alignItems: "flex-end",
  },
  title: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  meta: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.onSurfaceVariant,
    textTransform: "uppercase",
    marginTop: 2,
  },
  pill: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    fontWeight: "700",
    textTransform: "uppercase",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.default,
    borderWidth: 1,
    overflow: "hidden",
  },
  expiry: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
});
