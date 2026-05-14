import { EatByHeader } from "@/components/eatby";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Radii } from "@/theme/radii";
import { Spacing } from "@/theme/spacing";
import { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

type ChipTone = "safe" | "critical" | "warning";

type DayCell = {
  day: string;
  muted?: boolean;
  today?: boolean;
  chips: { text: string; tone: ChipTone }[];
};

/** Layout aligned with food_calendar_eatby mock (month bridge) */
const GRID: DayCell[] = [
  { day: "27", muted: true, chips: [] },
  { day: "28", muted: true, chips: [] },
  { day: "29", muted: true, chips: [] },
  { day: "30", muted: true, chips: [] },
  { day: "31", muted: true, chips: [] },
  { day: "1", chips: [{ text: "Milk (2L)", tone: "safe" }] },
  { day: "2", chips: [] },
  { day: "3", chips: [] },
  { day: "4", chips: [] },
  { day: "5", chips: [{ text: "Spinach", tone: "safe" }] },
  { day: "6", chips: [] },
  { day: "7", chips: [] },
  { day: "8", chips: [] },
  { day: "9", chips: [] },
  { day: "10", chips: [] },
  { day: "11", chips: [] },
  { day: "12", chips: [{ text: "Chicken", tone: "critical" }, { text: "Eggs x6", tone: "critical" }], today: true },
  { day: "13", chips: [{ text: "Beef Mince", tone: "warning" }] },
  { day: "14", chips: [] },
  { day: "15", chips: [] },
  { day: "16", chips: [] },
  { day: "17", chips: [] },
  { day: "18", chips: [] },
  { day: "19", chips: [] },
  { day: "20", chips: [] },
  { day: "21", chips: [] },
  { day: "22", chips: [] },
  { day: "23", chips: [] },
  { day: "24", chips: [] },
  { day: "25", chips: [] },
  { day: "26", chips: [] },
  { day: "27", chips: [] },
  { day: "28", chips: [] },
  { day: "29", chips: [] },
  { day: "30", chips: [] },
  { day: "31", chips: [] },
];

function chipColors(tone: ChipTone) {
  switch (tone) {
    case "safe":
      return {
        bg: Colors.primaryContainer,
        text: Colors.onPrimaryContainer,
        border: Colors.primary,
      };
    case "critical":
      return {
        bg: Colors.secondary,
        text: Colors.onSecondary,
        border: Colors.secondary,
      };
    case "warning":
      return {
        bg: Colors.tertiaryContainer,
        text: Colors.onTertiaryContainer,
        border: Colors.tertiary,
      };
  }
}

export default function Calendar() {
  const { width } = useWindowDimensions();
  const gridWidth = width - Spacing.containerMargin * 2;
  const cellW = gridWidth / 7;

  const rows = useMemo(() => {
    const out: DayCell[][] = [];
    for (let i = 0; i < GRID.length; i += 7) {
      out.push(GRID.slice(i, i + 7));
    }
    return out;
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <EatByHeader variant="calendar" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.gridWrap, { width: gridWidth }]}>
          <View style={styles.weekRow}>
            {WEEKDAYS.map((d) => (
              <View
                key={d}
                style={[
                  styles.weekCell,
                  { width: cellW },
                  d !== "SAT" && styles.weekCellBorder,
                ]}
              >
                <Text style={styles.weekLabel}>{d}</Text>
              </View>
            ))}
          </View>
          {rows.map((row, ri) => (
            <View key={ri} style={styles.dayRow}>
              {row.map((cell, ci) => (
                <View
                  key={`${ri}-${ci}`}
                  style={[
                    styles.dayCell,
                    { width: cellW, minHeight: 100 },
                    cell.muted && styles.dayCellMuted,
                    ci < 6 && styles.dayCellBorderR,
                    styles.dayCellBorderB,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNum,
                      cell.muted && styles.dayNumMuted,
                      cell.today && styles.dayNumToday,
                    ]}
                  >
                    {cell.day}
                  </Text>
                  {cell.chips.map((c) => {
                    const cc = chipColors(c.tone);
                    return (
                      <View
                        key={c.text}
                        style={[
                          styles.chip,
                          {
                            backgroundColor: cc.bg,
                            borderLeftColor: cc.border,
                          },
                        ]}
                      >
                        {c.tone === "critical" ? (
                          <View style={styles.chipDot} />
                        ) : null}
                        <Text
                          style={[styles.chipText, { color: cc.text }]}
                          numberOfLines={1}
                        >
                          {c.text}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          ))}
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
    paddingBottom: 100,
  },
  gridWrap: {
    alignSelf: "center",
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.default,
    overflow: "hidden",
  },
  weekRow: {
    flexDirection: "row",
  },
  weekCell: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingVertical: Spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  weekCellBorder: {
    borderRightWidth: 1,
    borderRightColor: Colors.outlineVariant,
  },
  weekLabel: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.onSurfaceVariant,
    textTransform: "uppercase",
  },
  dayRow: {
    flexDirection: "row",
  },
  dayCell: {
    padding: Spacing.xs,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  dayCellMuted: {
    backgroundColor: Colors.surfaceContainerLow,
    opacity: 0.55,
  },
  dayCellBorderR: {
    borderRightWidth: 1,
    borderRightColor: Colors.outlineVariant,
  },
  dayCellBorderB: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  dayNum: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.onSurface,
  },
  dayNumMuted: {
    color: Colors.onSurfaceVariant,
  },
  dayNumToday: {
    color: Colors.primary,
    fontWeight: "700",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: Radii.sm,
    borderLeftWidth: 4,
    overflow: "hidden",
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.onSecondary,
    marginRight: 4,
  },
  chipText: {
    flex: 1,
    fontFamily: FontFamily.monoMedium,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    minWidth: 0,
  },
});
