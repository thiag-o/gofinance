import React from "react";
import "intl";

import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import { SignIn } from "./src/screens/SignIn";
import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/hooks/auth";

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || fontsError) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  SplashScreen.hideAsync();
  if (fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StatusBar style="light" />
            <AuthProvider>
              <SignIn />
            </AuthProvider>
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }
}
