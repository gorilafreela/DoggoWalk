import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "react-native-vector-icons";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const data = [
    {
      fullname: "Adriel",
    },
    {
      fullname: "Lucas neto da silva sauro",
    },
  ];
  const [selectedJob, setSelectedJob] = useState();

 
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Solicitations</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            padding: 8,
            borderRadius: 4,
            margin: 4,
          }}
          onPress={() => window.location.reload()}
        >
          <MaterialIcons name="refresh" size={30} color="#1d1f23" />
        </TouchableOpacity>
      </View>

      <View style={{ display: "flex", flex: 1, marginTop: 32 }}>
        {data.map((item, index) => (
          <View key={index} style={styles.cardJob}>
            <Text style={styles.solicitationTitle}>{item.fullname}</Text>

            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#24E5AF",
                  padding: 8,
                  borderRadius: 4,
                  marginBottom: 5,
                }}
              >
                <Text>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FF6171",
                  padding: 8,
                  borderRadius: 4,
                  marginTop: 5,
                }}
              >
                <Text>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Popularjobs;
