import React from "react";
import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import { Register } from "./src/screens/Register";
import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <GestureHandlerRootView>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <AppRoutes />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }
}
