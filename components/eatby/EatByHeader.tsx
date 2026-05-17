import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";
import { Spacing } from "@/theme/spacing";
import { FontFamily } from "@/theme/fonts";

export type EatByHeaderVariant =
  | "inventory"
  | "calendar"
  | "scan"
  | "alerts"
  | "settings";

type EatByHeaderProps = {
  variant: EatByHeaderVariant;
};

export function EatByHeader({ variant }: EatByHeaderProps) {
  const router = useRouter();
  const showInventoryMark = true;
  const showSearch = variant === "inventory";
  const showSettings = variant !== "settings";
  const isSettings = variant === "settings";

  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        {isSettings ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.primary}
            />
          </Pressable>
        ) : null}
        {isSettings ? (
          <Text style={styles.title}>Settings</Text>
        ) : (
          <>
            {showInventoryMark ? (
              <MaterialIcons
                name="inventory-2"
                size={24}
                color={Colors.primary}
                style={styles.markIcon}
              />
            ) : null}
            <Text style={styles.wordmark}>EatBy</Text>
          </>
        )}
      </View>
      <View style={styles.right}>
        {isSettings ? (
          <MaterialIcons
            name="inventory-2"
            size={22}
            color={Colors.onSurfaceVariant}
          />
        ) : null}
        {showSearch ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search"
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <MaterialIcons
              name="search"
              size={22}
              color={Colors.onSurfaceVariant}
            />
          </Pressable>
        ) : null}
        {showSettings ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            onPress={() => router.push("/settings")}
            style={({ pressed }) => [
              styles.iconBtn,
              showSearch && styles.iconBtnAfter,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="settings"
              size={22}
              color={Colors.onSurfaceVariant}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.containerMargin,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  markIcon: {
    marginRight: Spacing.xs,
  },
  wordmark: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    color: Colors.primary,
  },
  title: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    color: Colors.primary,
  },
  iconBtn: {
    padding: Spacing.xs,
    borderRadius: 9999,
  },
  iconBtnAfter: {
    marginLeft: Spacing.sm,
  },
  pressed: {
    backgroundColor: Colors.surfaceContainer,
  },
});
