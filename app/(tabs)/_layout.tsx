import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/theme/colors";
import { FontFamily } from "@/theme/fonts";
import { Radii } from "@/theme/radii";
import { Spacing } from "@/theme/spacing";

function TabBarButton(props: BottomTabBarButtonProps) {
  const { onPress, accessibilityState, children } = props;
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      style={styles.tabPress}
      testID={focused ? "active-tab" : "inactive-tab"}
    >
      {focused && <View style={styles.activeBg} />}
      <View style={styles.tabInner}>{children}</View>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.onSurfaceVariant,
        tabBarActiveBackgroundColor: "rgba(16, 185, 129, 0.15)",
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.outlineVariant,
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          paddingTop: Spacing.xs,
          paddingBottom: Spacing.xs,
          paddingHorizontal: Spacing.sm,
        },
        tabBarLabel: ({ focused, children, color }) => (
          <Text
            style={{
              fontFamily: FontFamily.monoMedium,
              fontSize: 10,
              lineHeight: 14,
              letterSpacing: 0.5,
              marginTop: 2,
              paddingBottom: 2,
              color: typeof color === "string" ? color : Colors.onSurfaceVariant,
              fontWeight: focused ? "700" : "500",
            }}
          >
            {children}
          </Text>
        ),
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list-alt" color={color} size={size ?? 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-month" color={color} size={size ?? 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="qr-code-scanner"
              color={color}
              size={size ?? 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alert"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, focused, size }) => (
            <View style={styles.alertIconWrap}>
              <MaterialIcons
                name="notifications"
                color={color}
                size={size ?? 22}
              />
              {focused ? null : (
                <View style={styles.badge} accessibilityElementsHidden />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabPress: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radii.lg,
  },
  activeBg: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 8,
    right: 8,
    backgroundColor: "#10b981",
    borderRadius: Radii.md,
  },
  tabPressActive: {
    backgroundColor: "#10b981",
  },
  tabPressPressed: {
    opacity: 0.85,
  },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  alertIconWrap: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
});
