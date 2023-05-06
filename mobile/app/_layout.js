import { Stack,Screen } from "expo-router";
import { useFonts } from "expo-font";
import Home from "./home.js"; 
import Jobs from "./jobs.js"; 

export const unstable_settings = {
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="home">
    <Screen name="home" component={Home} />
    <Screen name="jobs" component={Jobs} />
  </Stack>
  );
};

export default Layout;
