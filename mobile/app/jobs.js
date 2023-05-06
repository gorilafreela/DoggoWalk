import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity,Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {clearSession} from "../services/StorageService";
import { getData } from "../services/StorageService";
import { ScreenHeaderBtn, Popularjobs } from "../components";
import { MaterialIcons } from "react-native-vector-icons";
const Jobs = () => {
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = await getData("token");
      if (!token) {
        router.push(`/home`);
      }
    };
    checkToken();
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
          title:"JOBS",
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
          <Popularjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Jobs;
