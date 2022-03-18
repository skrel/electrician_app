import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
  Linking,
  TouchableHighlight,
  Alert,
} from "react-native";
import { auth } from "../firebase";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const myProfile = () => {
  const navigation = useNavigation();

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };

  const SibmitCompany = () => {
    Alert.alert(
      "Error",
      "This company is not registered in the system. Reach out via appforconstruction@gmail.com",
      [
        {
          text: "Ok",
          //onPress: () => navigation.navigate("Home"),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={[styles.screenTitle]}>My Profile</Text>
        <Image
          source={require("../assets/Header-Icon-User.png")}
          style={styles.profileImg}
        />
        <Text style={{ padding: 10 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="company name"
          //onChangeText={(text) => setPassword(text)}
          //value={password}
        />
        <TouchableOpacity style={styles.buttonSubmit} onPress={SibmitCompany}>
          <Text style={[styles.buttontextSubmit]}> Submit </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
        <TouchableOpacity style={styles.buttonDeck}>
          <MaterialCommunityIcons name="salesforce" size={24} color="#9c9c9c" />
          <Text style={[styles.buttontextdisabled]}> Connect to </Text>
          <Text style={[styles.buttontextdisabled]}> CRM </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDeck}>
          <MaterialCommunityIcons name="rotate-3d" size={22} color="#9c9c9c" />
          <Text style={[styles.buttontextdisabled]}> To BIM </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDeck}>
          <Feather name="pie-chart" size={22} color="#9c9c9c" />
          <Text style={[styles.buttontextdisabled]}> Charts </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDeck} onPress={signOut}>
          <FontAwesome name="sign-out" size={24} color="black" />
          <Text style={[styles.buttontext]}> Sing </Text>
          <Text style={[styles.buttontext]}> Out </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //justifyContent: 'space-evenly'
    //alignContent: 'center'
    //alignItems: 'center'
    alignSelf: "flex-end",
    marginEnd: 20,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
  buttontextSignOut: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff",
  },
  buttonSignOut: {
    alignItems: "center",
    backgroundColor: "#000000",
    height: 40,
    margin: 16,
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  buttonDeck: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    height: 42,
    margin: 16,
    padding: 10,
    borderRadius: 10,
  },
  buttontext: {
    //fontWeight: "bold",
    fontSize: 10,
    marginTop: 2,
    color: "#000000",
  },
  buttontextdisabled: {
    fontSize: 10,
    marginTop: 2,
    color: "#9c9c9c",
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 10,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#f7f7f7",
  },
  buttontextSubmit: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000000",
  },
  buttonSubmit: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    //margin: 16,
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    borderWidth: 2,
  },
});

export default myProfile;
