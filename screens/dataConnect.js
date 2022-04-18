import React, { useState, useEffect, ScrollView } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebase";

function dataConnect() {
  const [userInfo, setUserInfo] = useState([]);
  //checkbox
  const [box, setBox] = useState('');

  const retrieveFromFirebase = () => {
    db.collection("jsondata")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUserInfo(doc.data());
        });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.flexRow}>
        <TouchableOpacity style={styles.button} onPress={retrieveFromFirebase}>
          <Text style={[styles.buttontext]}> Data Connect </Text>
        </TouchableOpacity>
      </View>
      <Text>{userInfo.box}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000000",
    flex: 1,
    height: 40,
    margin: 16,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
});

export default dataConnect;
