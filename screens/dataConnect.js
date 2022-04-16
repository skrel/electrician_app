import React, { useState, useEffect, ScrollView } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from "../firebase";

function dataConnect() {
  const [userInfo, setUserInfo] = useState([]);
  //checkbox
  const [box, setBox] = useState(false);

  const userDocument = db
    .collection("jsondata")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        setUserInfo(doc.data());
      });
    });
    

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text>{userInfo.box}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  buttonForConfig: {
    alignItems: "center",
    backgroundColor: "#dba400",
    //flex: 0.2,
    height: 30,
    width: 100,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 4,
    marginLeft: 20,
    padding: 6,
    borderRadius: 10,
  },
});

export default dataConnect;
