import { Tabs } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/icon-symbol";

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
    <View
      style={[
        styles.tabBarContainer,
        {
          bottom: Math.max(insets.bottom, 10),
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

        let iconName = "house.fill";

        if (route.name === "missions") {
          iconName = "target";
        }

        if (route.name === "rewards") {
          iconName = "gift.fill";
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              isFocused && styles.activeTabItem,
            ]}
          >
            <IconSymbol
              size={22}
              name={iconName as any}
              color={isFocused ? COLORS.background : COLORS.inactive}
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

    left: 15,
    right: 15,

    height: 60,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.surface,

    borderWidth: 2,
    borderColor: COLORS.lime,

    borderRadius: 32,

    paddingHorizontal: 4,

    elevation: 0,
    shadowOpacity: 0,
  },

  tabItem: {
    flex: 1,

    height: 50,

    marginHorizontal: 0,

    borderRadius: 30,

    alignItems: "center",
    justifyContent: "center",

    gap: 2,
  },

  activeTabItem: {
    backgroundColor: COLORS.lime,
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});