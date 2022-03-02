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

const Profile = () => {

  const [signIn, setSignInEnabled] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
      {signIn ? (
              <Text style={{ textAlign: "center", backgroundColor: "red", color: "white", opacity : 1 }}>
              This account doesn't exist. Reach out to us via appforconstruction@gmail.com to create your account
              </Text>
            ) : 
            <Text style={{ textAlign: "center", backgroundColor: "red", color: "white", opacity : 0 }}>
          This account doesn't exist. Reach out to us via appforconstruction@gmail.com to create your account
          </Text>
            }
      </View>
        <TextInput
          style={styles.input}
          placeholder="login"
          //onChangeText={(text) => setItemDescription(text)}
          //value={itemDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          //onChangeText={(text) => setItemDescription(text)}
          //value={itemDescription}
        />

      <TouchableOpacity style={styles.button} onPress={() => setSignInEnabled(!signIn)}>
      <Text style={[styles.buttontext]}> Sign In </Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
          <Text
            style={{ textAlign: "center", color: "blue" }}
            onPress={() =>
              Linking.openURL("https://github.com/skrel/Electrician/wiki")
            }
          >
            Click here for more info
          </Text>
          <Text style={{ textAlign: "center" }}>
            Reach out via appforconstruction@gmail.com
          </Text>
        </View>

        <View style={{ flexRow: 1, margin: 10 }}>
        <AntDesign name="copyright" size={16} color="black" />
        <Text style={{ marginTop: 3 }}>
            Electrician App
          </Text>
        </View>

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

export default Profile;
