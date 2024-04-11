import React from "react";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: { padding: Platform.OS === "ios" ? 20 : 0, height: 88 },
      }}
    >
      <Screen
        name="Listagem"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
        component={Dashboard}
      />
      <Screen
        name="Cadastrar"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
        component={Register}
      />
      <Screen
        name="Resumo"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="pie-chart" size={size} color={color} />
          ),
        }}
        component={Resume}
      />
    </Navigator>
  );
}
