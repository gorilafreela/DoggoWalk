import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import UserService from "../services/UserService";
import {
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter()
  const [emailValue, setEmailValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");
  const [ButtonValue, setButtonValue] = useState("");
  const [session, setSession] = useState("");
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
                setSession(res.data);
                alert(res.data.token)
              },(err)=> {
                alert(err.response.data.message)
              })
            }}
          />

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
