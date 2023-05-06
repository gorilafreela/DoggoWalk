import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity,Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {clearSession} from "../services/StorageService";
import { getData } from "../services/StorageService";
import { ScreenHeaderBtn } from "../components";
import { MaterialIcons } from "react-native-vector-icons";
//import MapView, { Marker } from "react-native-maps";
//import Geolocation from "react-native-geolocation-service";


const Map = () => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    const checkToken = async () => {
      const token = await getData('token');

      if (!token) {
        router.push(`/home`);
      }
    };
    checkToken();

    // Geolocation.getCurrentPosition(
    //   position => {
    //     setUserLocation({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       latitudeDelta: 0.015,
    //       longitudeDelta: 0.0121,
    //     });
    //   },
    //   error => {
    //     console.log(error.code, error.message);
    //   },
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    // );
  }, [router]);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          title:"MAPS",
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: COLORS.dark,padding:8,borderRadius:10 }}
              onPress={() => {
                clearSession().then(()=> {
                  alert("You have logout successfully")
                  router.push(`/home`);
                })
              }}
            >
              <Text style={{ color: "#fff" }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
         <TouchableOpacity
  style={{
    backgroundColor: "#FF6171",
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }}
  onPress={() => {
    // handle button press
  }}
>
  <Text style={{ color: "#fff", fontSize: 18 }}>Finish walk</Text>
</TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Map;
