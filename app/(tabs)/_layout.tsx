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
  const focused = accessibilityState?.selected ?? false;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabPress,
        focused && styles.tabPressActive,
        pressed && !focused && styles.tabPressPressed,
      ]}
    >
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
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.outlineVariant,
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          paddingTop: Spacing.xs,
          paddingBottom: Spacing.xs,
        },
        tabBarLabel: ({ focused, children, color }) => (
          <Text
            style={{
              fontFamily: FontFamily.monoMedium,
              fontSize: 10,
              lineHeight: 14,
              letterSpacing: 0.5,
              marginTop: 2,
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
        tabBarButton: (p) => <TabBarButton {...p} />,
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
    paddingVertical: 4,
    paddingHorizontal: Spacing.xs,
    borderRadius: Radii.xl,
  },
  tabPressActive: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
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
