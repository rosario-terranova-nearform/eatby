import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";
import { Spacing } from "@/theme/spacing";
import { Radii } from "@/theme/radii";
import { FontFamily } from "@/theme/fonts";

export type AlertListItemProps = {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
  urgency: "critical" | "upcoming";
};

const bar: Record<AlertListItemProps["urgency"], string> = {
  critical: Colors.secondary,
  upcoming: Colors.tertiaryContainer,
};

const tileBg: Record<AlertListItemProps["urgency"], string> = {
  critical: Colors.surfaceContainerHighest,
  upcoming: Colors.surfaceContainerHigh,
};

const tileSize: Record<AlertListItemProps["urgency"], number> = {
  critical: 48,
  upcoming: 40,
};

export function AlertListItem({
  title,
  subtitle,
  icon,
  urgency,
}: AlertListItemProps) {
  const ts = tileSize[urgency];
  return (
    <View style={styles.card}>
      <View style={[styles.accent, { backgroundColor: bar[urgency] }]} />
      <View style={styles.inner}>
        <View style={styles.row}>
          <View
            style={[
              styles.iconTile,
              {
                width: ts,
                height: ts,
                backgroundColor: tileBg[urgency],
              },
            ]}
          >
            <MaterialIcons
              name={icon}
              size={urgency === "critical" ? 24 : 22}
              color={Colors.onSurfaceVariant}
            />
          </View>
          <View style={styles.textBlock}>
            <Text
              style={
                urgency === "critical" ? styles.titleCritical : styles.titleUp
              }
            >
              {title}
            </Text>
            <Text style={styles.sub}>{subtitle}</Text>
          </View>
        </View>
        {urgency === "critical" ? (
          <View style={styles.criticalPill}>
            <Text style={styles.criticalPillText}>CRITICAL</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.default,
    overflow: "hidden",
  },
  accent: {
    width: 4,
    alignSelf: "stretch",
  },
  inner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.sm,
    minWidth: 0,
  },
  iconTile: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radii.default,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  titleCritical: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onBackground,
  },
  titleUp: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    color: Colors.onBackground,
  },
  sub: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  criticalPill: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.base,
    borderRadius: Radii.full,
  },
  criticalPillText: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.onSecondary,
    textTransform: "uppercase",
  },
});
