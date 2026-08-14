import { Tabs } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  background: "#080C08",
  surface: "#101710",
  lime: "#9FE870",
  inactive: "#B8BDB8",
};

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  const visibleRoutes = state.routes.filter(
    (route: any) => route.name !== "explore"
  );

  return (
    <View style={styles.tabBarContainer}>
      <View
        style={[
          styles.navPill,
          {
            marginBottom: Math.max(insets.bottom, 4),
          },
        ]}
      >
        {visibleRoutes.map((route: any) => {
          const { options } = descriptors[route.key];

          const routeIndex = state.routes.findIndex(
            (item: any) => item.key === route.key
          );

          const isFocused = state.index === routeIndex;

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabItem,
                isFocused && styles.activeTabItem,
              ]}
            >
              <Ionicons
                name={
                  route.name === "index"
                    ? "home-outline"
                    : route.name === "missions"
                      ? "layers-outline"
                      : "gift-outline"
                }
                size={20}
                color={
                  isFocused
                    ? COLORS.background
                    : COLORS.inactive
                }
              />

              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused
                      ? COLORS.background
                      : COLORS.inactive,
                  },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="missions"
        options={{
          title: "Missions",
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    height: 92,

    backgroundColor: COLORS.background,

    alignItems: "center",
    justifyContent: "flex-end",

    paddingHorizontal: 24,
  },

  navPill: {
    width: "100%",
    height: 55,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.surface,

    borderWidth: 2,
    borderColor: COLORS.lime,

    borderRadius: 32,

    paddingHorizontal: 4,
  },

  tabItem: {
    flex: 1,
    height: 44,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",

    gap: 2,
  },

  activeTabItem: {
    backgroundColor: COLORS.lime,
  },

  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 1,
  },
});