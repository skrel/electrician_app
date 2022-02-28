import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

function Profile() {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={[styles.screenTitle]}>Profile</Text>
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
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default Profile;
