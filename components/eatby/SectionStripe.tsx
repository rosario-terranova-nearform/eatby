import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";
import { Spacing } from "@/theme/spacing";
import { Radii } from "@/theme/radii";
import { FontFamily } from "@/theme/fonts";

type UrgencyStripe = "immediate" | "upcoming" | "stable";

type SectionStripeProps = {
  label: string;
  urgency: UrgencyStripe;
};

const stripeColors: Record<
  UrgencyStripe,
  { border: string; bg: string; text: string }
> = {
  immediate: {
    border: Colors.secondary,
    bg: "rgba(182, 23, 34, 0.1)",
    text: Colors.secondary,
  },
  upcoming: {
    border: Colors.tertiary,
    bg: "rgba(226, 145, 0, 0.1)",
    text: Colors.tertiary,
  },
  stable: {
    border: Colors.primary,
    bg: "rgba(0, 108, 73, 0.08)",
    text: Colors.primary,
  },
};

export function SectionStripe({ label, urgency }: SectionStripeProps) {
  const c = stripeColors[urgency];
  return (
    <View style={[styles.wrap, { borderLeftColor: c.border, backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderLeftWidth: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.default,
  },
  text: {
    fontFamily: FontFamily.monoMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
