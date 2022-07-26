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

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
//import { sendEmail } from "../components/SendEmail.js";

function Register() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [role, setRole] = useState();

  const register = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        console.log('error message = ' + error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <Text style={[styles.screenTitle]}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <TextInput
            style={styles.input}
            placeholder="Company name"
            onChangeText={(text) => setCompany(text)}
            value={company}
          />

          <TextInput
            style={styles.input}
            placeholder="Your role"
            onChangeText={(text) => setRole(text)}
            value={role}
          />

          <TextInput
            style={styles.input}
            placeholder="Email*"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <TextInput
            style={styles.input}
            placeholder="Password*"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={register}
        >
          <Text style={[styles.buttontext]}> Register </Text>
        </TouchableOpacity>
      </View>
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
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    flex: 1,
    height: 40,
    margin: 16,
    padding: 10,
    borderRadius: 10,
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
  itemcard: {
    backgroundColor: "#e6e6e6",
    flex: 1,
    margin: 16,
    padding: 10,
    borderRadius: 20,
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 20,
  },
  normaltext: {
    fontSize: 14,
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
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#f7f7f7",
  },
  textSmall: {
    //fontWeight: "bold",
    fontSize: 8,
    textAlign: "right",
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default Register;
