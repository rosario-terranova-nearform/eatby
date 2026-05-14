import {
  EatByHeader,
  InventoryItemCard,
  PrimaryFab,
  SectionStripe,
} from "@/components/eatby";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Spacing } from "@/theme/spacing";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IMMEDIATE = [
  {
    title: "Greek Yogurt",
    meta: "DAIRY • 2X 500G",
    pillLabel: "14 HOURS LEFT",
    expiryCaption: "Exp: Today, 11:59 PM",
    urgency: "critical" as const,
  },
  {
    title: "Fresh Raspberries",
    meta: "PRODUCE • 1X PUNNET",
    pillLabel: "1 DAY LEFT",
    expiryCaption: "Exp: Tomorrow",
    urgency: "critical" as const,
  },
];

const UPCOMING = [
  {
    title: "Organic Whole Milk",
    meta: "DAIRY • 2L",
    pillLabel: "2 DAYS LEFT",
    expiryCaption: "Exp: Thursday",
    urgency: "warning" as const,
  },
  {
    title: "Chicken Breast",
    meta: "MEAT • 500G",
    pillLabel: "3 DAYS LEFT",
    expiryCaption: "Exp: Friday",
    urgency: "warning" as const,
  },
];

const STABLE = [
  {
    title: "Unsalted Butter",
    meta: "DAIRY • 250G",
    pillLabel: "12 DAYS LEFT",
    expiryCaption: "Exp: Next Month",
    urgency: "safe" as const,
  },
  {
    title: "Shredded Mozzarella",
    meta: "DAIRY • 1KG",
    pillLabel: "24 DAYS LEFT",
    expiryCaption: "Exp: Oct 12",
    urgency: "safe" as const,
  },
];

export default function Inventory() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <EatByHeader variant="inventory" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Inventory</Text>
        </View>

        <View style={styles.section}>
          <SectionStripe
            label="IMMEDIATE ATTENTION REQUIRED"
            urgency="immediate"
          />
          <View style={styles.list}>
            {IMMEDIATE.map((item) => (
              <InventoryItemCard key={item.title} {...item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionStripe label="UPCOMING DEADLINES" urgency="upcoming" />
          <View style={styles.list}>
            {UPCOMING.map((item) => (
              <InventoryItemCard key={item.title} {...item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionStripe label="STABLE INVENTORY" urgency="stable" />
          <View style={styles.list}>
            {STABLE.map((item) => (
              <InventoryItemCard key={item.title} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>
      <PrimaryFab />
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
    paddingBottom: 120,
  },
  titleRow: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.onSurface,
    paddingBottom: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  pageTitle: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.56,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  section: {
    gap: Spacing.base,
    marginBottom: Spacing.lg,
  },
  list: {
    gap: Spacing.base,
  },
});
