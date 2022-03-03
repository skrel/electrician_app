import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from '@expo/vector-icons';

const Other = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 200,
    height: 420,
    borderColor: "red",
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
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
    //flex: 1,
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
  errorBlock: {

  },
});

export default Other;