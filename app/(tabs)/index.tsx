import {
  EatByHeader,
  EditFoodModal,
  InventoryItemCard,
} from "@/components/eatby";
import { useInventory } from "@/lib/inventory";
import type { Food, InventoryItemDisplay } from "@/lib/types";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Spacing } from "@/theme/spacing";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function groupByUrgency(items: InventoryItemDisplay[]) {
  const critical: typeof items = [];
  const warning: typeof items = [];
  const safe: typeof items = [];

  items.forEach((item) => {
    if (item.urgency === "critical") critical.push(item);
    else if (item.urgency === "warning") warning.push(item);
    else safe.push(item);
  });

  return { critical, warning, safe };
}

export default function Inventory() {
  const { getDisplayItems, getFoodById, updateFood, removeFood } =
    useInventory();
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const items = getDisplayItems();
  const grouped = groupByUrgency(items);
  const critical = grouped.critical;
  const warning = grouped.warning;
  const safe = grouped.safe;

  const selectedFood = selectedFoodId
    ? (getFoodById(selectedFoodId) ?? null)
    : null;

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
      <EatByHeader variant="inventory" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Inventory</Text>
          <Text style={styles.itemCount}>
            {items.length} {items.length === 1 ? "item" : "items"}
          </Text>
        </View>

        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No items yet</Text>
            <Text style={styles.emptySubtitle}>
              Go to the scan tab to add your first food item
            </Text>
          </View>
        ) : (
          <>
            {critical.length > 0 && (
              <View style={styles.section}>
                <View style={styles.list}>
                  {critical.map((item) => (
                    <InventoryItemCard
                      key={item.id}
                      {...item}
                      onPress={() => setSelectedFoodId(item.id)}
                    />
                  ))}
                </View>
              </View>
            )}

            {warning.length > 0 && (
              <View style={styles.section}>
                <View style={styles.list}>
                  {warning.map((item) => (
                    <InventoryItemCard
                      key={item.id}
                      {...item}
                      onPress={() => setSelectedFoodId(item.id)}
                    />
                  ))}
                </View>
              </View>
            )}

            {safe.length > 0 && (
              <View style={styles.section}>
                <View style={styles.list}>
                  {safe.map((item) => (
                    <InventoryItemCard
                      key={item.id}
                      {...item}
                      onPress={() => setSelectedFoodId(item.id)}
                    />
                  ))}
                </View>
              </View>
            )}
          </>
        )}
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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  titleRow: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.onSurface,
    paddingBottom: Spacing.xs,
    marginBottom: Spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  pageTitle: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.56,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  itemCount: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.onSurfaceVariant,
  },
  section: {
    gap: Spacing.base,
    marginBottom: Spacing.lg,
  },
  list: {
    gap: Spacing.md,
  },
  emptyState: {
    paddingVertical: Spacing.xxl,
    alignItems: "center",
  },
  emptyTitle: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onSurface,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    textAlign: "center",
  },
});
