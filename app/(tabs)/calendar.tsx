import { useState } from "react";
import { EatByHeader, EditFoodModal } from "@/components/eatby";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Radii } from "@/theme/radii";
import { Spacing } from "@/theme/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInventory } from "@/lib/inventory";
import type { Food } from "@/lib/types";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

type ChipTone = "safe" | "critical" | "warning";

type Chip = {
  id: string;
  text: string;
  tone: ChipTone;
};

type DayCell = {
  day: string;
  muted?: boolean;
  today?: boolean;
  chips: Chip[];
};

function getChipTone(expiryDate: Date): ChipTone {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays <= 1) return "critical";
  if (diffDays <= 3) return "warning";
  return "safe";
}

function generateCalendarGrid(items: Food[], now: Date): DayCell[] {
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const result: DayCell[] = [];

  const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  const prevMonthDays = prevMonth.getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    result.push({
      day: day.toString(),
      muted: true,
      chips: [],
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(now.getFullYear(), now.getMonth(), day);
    cellDate.setHours(0, 0, 0, 0);
    const cellDateEnd = new Date(cellDate);
    cellDateEnd.setHours(23, 59, 59, 999);

    const dayItems = items.filter((item) => {
      const itemDate = new Date(item.expiryDate);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === cellDate.getTime();
    });

    const isToday =
      day === now.getDate() &&
      now.getMonth() === cellDate.getMonth() &&
      now.getFullYear() === cellDate.getFullYear();

    result.push({
      day: day.toString(),
      today: isToday,
      chips: dayItems.map((item) => ({
        id: item.id,
        text: item.name,
        tone: getChipTone(item.expiryDate),
      })),
    });
  }

  const remaining = 42 - result.length;
  for (let day = 1; day <= remaining; day++) {
    result.push({
      day: day.toString(),
      muted: true,
      chips: [],
    });
  }

  return result;
}

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
  const { items, getFoodById, updateFood, removeFood } = useInventory();
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const { width } = useWindowDimensions();
  const gridWidth = width - Spacing.containerMargin * 2;
  const cellW = gridWidth / 7;

  const goToPrevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const monthYearLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const grid = generateCalendarGrid(items, currentDate);

  const rows: DayCell[][] = [];
  for (let i = 0; i < grid.length; i += 7) {
    rows.push(grid.slice(i, i + 7));
  }

  const selectedFood = selectedFoodId ? getFoodById(selectedFoodId) ?? null : null;

  const handleSave = (updates: Partial<Omit<Food, "id" | "addedAt">>) => {
    if (selectedFoodId) {
      updateFood(selectedFoodId, updates);
    }
  };

  const handleDelete = () => {
    if (selectedFoodId) {
      removeFood(selectedFoodId);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <EatByHeader variant="calendar" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.monthNav}>
          <Pressable
            onPress={goToPrevMonth}
            style={styles.navButton}
            accessibilityRole="button"
            accessibilityLabel="Previous month"
          >
            <MaterialIcons
              name="chevron-left"
              size={28}
              color={Colors.onSurface}
            />
          </Pressable>
          <Text style={styles.monthLabel}>{monthYearLabel}</Text>
          <Pressable
            onPress={goToNextMonth}
            style={styles.navButton}
            accessibilityRole="button"
            accessibilityLabel="Next month"
          >
            <MaterialIcons
              name="chevron-right"
              size={28}
              color={Colors.onSurface}
            />
          </Pressable>
        </View>

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
                      <Pressable
                        key={c.id}
                        onPress={() => setSelectedFoodId(c.id)}
                        style={({ pressed }) => [
                          styles.chip,
                          {
                            backgroundColor: cc.bg,
                            borderLeftColor: cc.border,
                          },
                          pressed && styles.chipPressed,
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
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <EditFoodModal
        visible={selectedFoodId !== null}
        food={selectedFood}
        onClose={() => setSelectedFoodId(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
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
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  navButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radii.full,
  },
  monthLabel: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onSurface,
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
  chipPressed: {
    opacity: 0.75,
  },
});
