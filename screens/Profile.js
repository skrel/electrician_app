//import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("myProfile", {
          lastLogin: user.metadata.lastLoginAt,
          createdAt: user.metadata.createdAt,
        });
        console.log('User metadata: ', user.metadata);
      }
    });
    return unsubscribe;
  }, []);

  //v9 Sign up new users
  const register = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  //v9 Sign in existing users
  const signIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TextInput
        style={styles.input}
        placeholder="login"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.buttonSignIn} onPress={signIn}>
        <Text style={[styles.buttontextSignIn]}> Sign In </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister} onPress={register}>
        <Text style={[styles.buttontextRegister]}> Register </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate("Register")}>
        <Text style={[styles.buttontextRegister]}> Register Screen </Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
        <AntDesign
          name="copyright"
          size={12}
          color="black"
          style={{ alignSelf: "center" }}
        />
        <Text style={{ textAlign: "center", paddingBottom: 20 }}>
          Electrician App
        </Text>

        <Text
          style={{ textAlign: "center", color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://www.linkedin.com/company/app-for-electrician/?viewAsMember=true"
            )
          }
        >
          Find Us On LinkedIn
        </Text>
      </View>
    </SafeAreaView>
  );
};

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
    alignContent: "center",
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: "italic",
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
  flexRow: {
    flexDirection: "row",
  },
  buttontextSignIn: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff",
  },
  buttontextRegister: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000000",
  },
  buttonSignIn: {
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
  buttonRegister: {
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

export default Profile;
