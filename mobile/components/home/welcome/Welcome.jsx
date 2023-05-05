import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";



const Welcome = ({ emailValue,PasswordValue, setEmailValue,setPasswordValue, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Walker</Text>
        <Text style={styles.welcomeMessage}>Find your perfect adventure!</Text>
      </View>

      <View  style={{ display: 'flex', flexDirection: 'column', flex: 1,marginTop:32 }}>
      <Text style={{color:"#FFFFFF"}}>E-mail</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={emailValue}
              onChangeText={(text) => setEmailValue(text)}
              placeholder="Type your e-mail..."
            />
          </View>
        </View>
      </View>

      <View  style={{ display: 'flex', flexDirection: 'column', flex: 1,marginTop:16 }}>
      <Text style={{color:"#FFFFFF"}}>Password</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={PasswordValue}
              onChangeText={(text) => setPasswordValue(text)}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>


      <View>
      
      <TouchableOpacity onPress={handleClick} style={{ backgroundColor: '#7e80ff', padding: 10, marginTop: 32,borderRadius:16,display: 'flex',justifyContent:"center",alignItems:"center" }}>
        <Text style={styles.welcomeMessage}>Login</Text>
      </TouchableOpacity>
    </View>

   
    </View>
  );
};

export default Welcome;
