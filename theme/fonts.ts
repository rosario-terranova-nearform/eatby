import {
  HankenGrotesk_400Regular,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
} from "@expo-google-fonts/hanken-grotesk";
import { JetBrainsMono_500Medium } from "@expo-google-fonts/jetbrains-mono";

/** Keys must match `fontFamily` strings after `loadAsync` / `useFonts` */
export const FontFamily = {
  sansRegular: "HankenGrotesk_400Regular",
  sansSemiBold: "HankenGrotesk_600SemiBold",
  sansBold: "HankenGrotesk_700Bold",
  monoMedium: "JetBrainsMono_500Medium",
} as const;

export const eatbyFontSources = {
  HankenGrotesk_400Regular,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
  JetBrainsMono_500Medium,
} as const;
