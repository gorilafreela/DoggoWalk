import React, { useEffect, useState } from "react";
import { Stack, Screen } from "expo-router";
import { useFonts } from "expo-font";
import { Home, Jobs, Map } from "./";

import * as Font from "expo-font"; // Add this line

export const unstable_settings = {
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="home">
      <Screen name="home" component={Home} />
      <Screen name="jobs" component={Jobs} />
      <Screen name="map" component={Map} />
    </Stack>
  );
};

export default Layout;
