import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "../constants";
import { clearSession } from "../services/StorageService";
import { getData } from "../services/StorageService";
import { ScreenHeaderBtn } from "../components";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import SolicitationService from "../services/SolicitationService";

const Map = ({ id }) => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState({});
  const [socket, setSocket] = useState(null);
  const route = useRoute();
  const ip = "52.7.196.103";
  const navigation = useNavigation();
  const [isSharingLocation, setShareLocation] = useState(true);
  const handleMapPress = (id) => {
    navigation.navigate("map-details", { id });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        console.log("Permissions sucessfully granted");
      } else {
        alert("Permissions not granted for share location");
      }

      const checkToken = async () => {
        const token = await getData("token");

        if (!token) {
          router.push(`/`);
        }
      };
      await checkToken();
    })();
  }, [route.params.id]);

  useEffect(() => {
    // create a new WebSocket object
    const newSocket = new WebSocket(
      `ws://${ip}:5001?solicitationId=${route.params.id}`
    );

    setInterval(async () => {
      await updateLocation(newSocket);
    }, 4000);

    // handle WebSocket events
    newSocket.onopen = () => {
      alert("WebSocket connected");
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    newSocket.onerror = (error) => {
      console.log("WebSocket error: ", error);
    };

    // cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [route.params.id]);

  const updateLocation = async (socket) => {
    const loc = await Location.getCurrentPositionAsync();
    setUserLocation(loc);
    const token = await getData("token");
    if (!token || !isSharingLocation) {
      console.log("User is not available");
      return;
    }
    // Printing  current GPS location
    console.log(`${loc.coords.latitude} ${loc.coords.longitude}`);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(`${loc.coords.latitude} ${loc.coords.longitude}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          title: "MAPS",
          headerRight: () => (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.dark,
                padding: 8,
                borderRadius: 10,
              }}
              onPress={() => {
                clearSession().then(() => {
                  alert("You have logout successfully");
                  router.push(`/home`);
                });
              }}
            >
              <Text style={{ color: "#fff" }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF6171",
              padding: 16,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 32,
            }}
            onPress={() => {
              SolicitationService.reply(route.params.id, 0).then(() => {
                setShareLocation(false);
                alert("Refused to share location successfully");
                navigation.navigate('Jobs'); 
                
              });
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Finish walk</Text>
          </TouchableOpacity>
          <View>
            {userLocation.coords ? (
              <>
                <Text style={{ color: "#fff", fontSize: 18, opacity: .8 }}>
                  Latitude:{" "}
                  <Text style={{ color: "#fff", fontSize: 18, opacity: 0.25 }}>
                    {userLocation.coords.latitude}
                  </Text>
                </Text>
                <Text style={{ color: "#fff", fontSize: 18, opacity: .8 }}>
                  Longitude:{" "}
                  <Text style={{ color: "#fff", fontSize: 18,opacity: 0.25  }}>
                    {userLocation.coords.longitude}
                  </Text>
                </Text>

                <MapView
                  userInterfaceStyle={"dark"}
                  style={{ height: 400, marginTop: 32, borderRadius: 10 }}
                  initialRegion={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: userLocation.coords.latitude,
                      longitude: userLocation.coords.longitude,
                    }}
                    title={"You are here"}
                  />
                </MapView>
              </>
            ) : (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 70,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 18 }}>LOADING ...</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Map;
