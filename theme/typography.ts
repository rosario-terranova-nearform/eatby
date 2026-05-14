import type { TextStyle } from "react-native";
import { FontFamily } from "./fonts";

function capsLetterSpacing(size: number): number {
  return size * 0.05;
}

export function createTypography(): {
  display: TextStyle;
  headlineLg: TextStyle;
  headlineLgMobile: TextStyle;
  headlineMd: TextStyle;
  bodyLg: TextStyle;
  bodyMd: TextStyle;
  labelCaps: TextStyle;
  tabLabel: TextStyle;
} {
  return {
    display: {
      fontFamily: FontFamily.sansBold,
      fontSize: 40,
      fontWeight: "700",
      lineHeight: 48,
      letterSpacing: -0.8,
      color: undefined,
    },
    headlineLg: {
      fontFamily: FontFamily.sansSemiBold,
      fontSize: 32,
      fontWeight: "600",
      lineHeight: 40,
    },
    headlineLgMobile: {
      fontFamily: FontFamily.sansSemiBold,
      fontSize: 28,
      fontWeight: "600",
      lineHeight: 36,
    },
    headlineMd: {
      fontFamily: FontFamily.sansSemiBold,
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
    },
    bodyLg: {
      fontFamily: FontFamily.sansRegular,
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 28,
    },
    bodyMd: {
      fontFamily: FontFamily.sansRegular,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    labelCaps: {
      fontFamily: FontFamily.monoMedium,
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 16,
      letterSpacing: capsLetterSpacing(12),
      textTransform: "uppercase",
    },
    tabLabel: {
      fontFamily: FontFamily.monoMedium,
      fontSize: 10,
      fontWeight: "500",
      lineHeight: 14,
      letterSpacing: capsLetterSpacing(10),
    },
  };
}
