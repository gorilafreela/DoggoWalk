import { useState,useEffect } from "react";
import { SafeAreaView,Text, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import UserService from "../services/UserService";
import { getData,storeData } from "../services/StorageService";
import {
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter()
  const [emailValue, setEmailValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");
  useEffect(() => {
    const checkToken = async () => {
      const token = await getData("token");
      if (token) {
      //  router.push(`/jobs`);
       router.push(`/map`);
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
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
       
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            emailValue={emailValue}
            PasswordValue={PasswordValue}
            setEmailValue={setEmailValue}
            setPasswordValue={setPasswordValue}
            handleClick={() => {
              UserService.login(emailValue,PasswordValue).then((res)=> {
               storeData('token',res.data.token);
                alert('You have logged in successfully')
                router.push(`/jobs`)
              },(err)=> {
                alert(err.response.data.message)
                router.push(`/jobs`)
              })
            }}
          />

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
