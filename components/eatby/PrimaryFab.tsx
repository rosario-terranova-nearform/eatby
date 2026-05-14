import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/theme/colors";
import { Spacing } from "@/theme/spacing";

const FAB_SIZE = 56;
const BORDER = 2;
const TAB_BAR_CLEARANCE = 56;

export function PrimaryFab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 8) + TAB_BAR_CLEARANCE + Spacing.sm;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add item — open scan"
      onPress={() => router.push("/(tabs)/scan")}
      style={({ pressed }) => [
        styles.fab,
        { bottom },
        pressed && { opacity: 0.92, transform: [{ scale: 0.97 }] },
      ]}
    >
      <MaterialIcons name="add" size={32} color={Colors.onPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: Colors.primary,
    borderWidth: BORDER,
    borderColor: Colors.onPrimaryContainer,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
  },
});
