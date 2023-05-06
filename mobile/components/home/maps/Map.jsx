import { useState } from "react";

import {
  View,
  Text,
 
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./Map.style";


const Map = ({ }) => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Walker</Text>
        <Text style={styles.MapMessage}>Find your perfect adventure!</Text>
      </View>   
    </View>
  );
};

export default Map;
