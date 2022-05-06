import React, { useState, useEffect, ScrollView } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const LightConfigurator = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>Light Configurator</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default LightConfigurator;
