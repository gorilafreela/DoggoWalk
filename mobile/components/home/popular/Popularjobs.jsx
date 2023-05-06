import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "react-native-vector-icons";
import SolicitationService from "../../../services/SolicitationService";

import { View, Text, TouchableOpacity } from "react-native";

import styles from "./popularjobs.style";

const Popularjobs = () => {
  const navigation = useNavigation();
  const [solicitations, setSolicitations] = useState([]);

  useEffect(() => {
    try {
      SolicitationService.getAll().then((res)=> {
        const solicitations = res.data;

        for (let i = 0; i < solicitations.length; i++) {
          if(solicitations[i].active && solicitations[i].accepted) {
            navigation.navigate('map', { id: solicitations[i]._id });
          }
        }
        
        setSolicitations(solicitations);
      })
      
    } catch (error) {
      console.log("error..." ,error);
    }
  }, []);

  useEffect(() => {
    console.log(solicitations);
  }, []);

  
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

          <Text>Refresh page</Text>
    
        </TouchableOpacity>
      </View>

      <View style={{ display: "flex", flex: 1, marginTop: 32 }}>
        {solicitations.map((item, index) => (
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
                onPress={() => {
                    SolicitationService.reply(item._id,0).then(()=> {
                      alert("Accepted to share location successfully");
                      navigation.navigate('map', { id: solicitations[i]._id });
                    },(err)=> {
                      alert(err.response.data.message);
                    });
                   
                  
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
                onPress={() => {
               
                  SolicitationService.reply(item._id,0).then(()=> {
                    alert("Refused to share location successfully");
                  },(err)=> {
                  console.log(err);
                  })
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
