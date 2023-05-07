import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import { clearSession } from "../services/StorageService";
import { getData } from "../services/StorageService";
import { ScreenHeaderBtn } from "../components";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import SolicitationService from "../services/SolicitationService";

const Map = ({id}) => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState({});
  const [socket, setSocket] = useState(null);
  const route = useRoute();
  const ip = '192.168.3.33'
  const navigation = useNavigation();

  const handleMapPress = (id) => {
    navigation.navigate('map-details', { id });
   
  }

 
 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        console.log("Permissions sucessfully granted");
      } else {
        alert("Permissions not granted for share location");
      }
      const loc = await Location.getCurrentPositionAsync();
      setUserLocation(loc);
      
    })();
  }, []);


  useEffect(() => {
    // create a new WebSocket object
    const newSocket = new WebSocket(
      `ws://${ip}:5001?solicitationId=${route.params.id}`
    );
  
    // set the socket state to the new WebSocket object
    setSocket(newSocket);
  
    // handle WebSocket events
    newSocket.onopen = () => {
      alert("WebSocket connected");
    };
  
    newSocket.onmessage = (event) => {
      console.log("WebSocket message received: ", event.data);
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
  }, [id]);
  const updateLocation = async () => {
    const loc = await Location.getCurrentPositionAsync();
    setUserLocation(loc);

    console.log(`${loc.coords.latitude} ${loc.coords.longitude}`) // Here is 
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(`${loc.coords.latitude} ${loc.coords.longitude}`);
    }

  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await getData("token");

      if (!token) {
        router.push(`/`);
      }
    };
    checkToken();
  }, [router]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateLocation();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  

 

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
               
              SolicitationService.reply(route.params.id,0).then(()=> {
                alert("Refused to share location successfully");
                router.push(`/jobs`);
              })
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Finish walk</Text>
          </TouchableOpacity>
          <View>
            {userLocation.coords && (
              <>
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  id:{route.params.id}
                </Text>
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  Latitude: {userLocation.coords.latitude}
                </Text>
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  Longitude: {userLocation.coords.longitude}
                </Text>

                <MapView
                userInterfaceStyle={'dark'}
                  style={{ height: 400,marginTop:32,borderRadius: 10 }}
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
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Map;
