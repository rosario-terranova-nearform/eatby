import { AlertListItem, EatByHeader } from "@/components/eatby";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Radii } from "@/theme/radii";
import { Spacing } from "@/theme/spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IMMEDIATE = [
  {
    title: "Greek Yogurt",
    subtitle: "expires in 6 hours",
    icon: "local-dining" as const,
  },
  {
    title: "Fresh Spinach",
    subtitle: "expires in 14 hours",
    icon: "restaurant" as const,
  },
];

const UPCOMING = [
  {
    title: "Organic Eggs (12pk)",
    subtitle: "Expires in 1 day",
    icon: "cake" as const,
  },
  {
    title: "Whole Milk",
    subtitle: "Expires in 2 days",
    icon: "opacity" as const,
  },
];

const INSIGHTS = [
  {
    icon: "info" as const,
    title: "Tomorrow's Deadline",
    body: "You have 3 items reaching their deadline tomorrow. Plan your meals accordingly.",
  },
  {
    icon: "shopping-basket" as const,
    title: "Bulk Warnings",
    body: "The Produce category has high turnover. 5 items added today.",
  },
  {
    icon: "eco" as const,
    title: "Waste Saved",
    body: "You avoided 4.2kg of waste this week by acting on these alerts.",
  },
];

export default function Alert() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <EatByHeader variant="alerts" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <MaterialIcons
              name="priority-high"
              size={24}
              color={Colors.secondary}
              style={styles.sectionHeadIcon}
            />
            <Text style={styles.sectionTitle}>Immediate Action</Text>
          </View>
          <View style={styles.stack}>
            {IMMEDIATE.map((item) => (
              <AlertListItem
                key={item.title}
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                urgency="critical"
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <MaterialIcons
              name="warning"
              size={24}
              color={Colors.tertiary}
              style={styles.sectionHeadIcon}
            />
            <Text style={styles.sectionTitle}>Upcoming</Text>
          </View>
          <View style={styles.twoCol}>
            {UPCOMING.map((item) => (
              <View key={item.title} style={styles.upcomingWrap}>
                <AlertListItem
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  urgency="upcoming"
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <MaterialIcons
              name="analytics"
              size={24}
              color={Colors.primary}
              style={styles.sectionHeadIcon}
            />
            <Text style={styles.sectionTitle}>Inventory Insights</Text>
          </View>
          <View style={styles.insights}>
            {INSIGHTS.map((card) => (
              <View key={card.title} style={styles.insightCard}>
                <MaterialIcons
                  name={card.icon}
                  size={22}
                  color={Colors.primary}
                  style={styles.insightIcon}
                />
                <Text style={styles.insightTitle}>{card.title}</Text>
                <Text style={styles.insightBody}>{card.body}</Text>
              </View>
            ))}
          </View>
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
    paddingTop: Spacing.md,
    paddingBottom: 100,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    color: Colors.onBackground,
  },
  sectionHeadIcon: {
    marginRight: Spacing.base,
  },
  stack: {
    gap: Spacing.sm,
  },
  twoCol: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  upcomingWrap: {
    flexGrow: 1,
    flexBasis: "48%",
    minWidth: 160,
  },
  insights: {
    gap: Spacing.sm,
  },
  insightCard: {
    backgroundColor: Colors.surfaceContainerHigh,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.default,
  },
  insightIcon: {
    marginBottom: Spacing.xs,
  },
  insightTitle: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  insightBody: {
    fontFamily: FontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    marginTop: Spacing.xs,
  },
  hero: {
    marginTop: Spacing.lg,
    height: 192,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radii.default,
    overflow: "hidden",
    backgroundColor: Colors.surfaceContainerLow,
  },
  heroInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
  },
  heroCaption: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    color: Colors.outline,
    marginTop: Spacing.sm,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
