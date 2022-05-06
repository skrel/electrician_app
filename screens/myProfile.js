import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import * as SQLite from "expo-sqlite";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

const MyProfile = () => {
  const navigation = useNavigation();
  const [itemsDB, setItemsDB] = useState(0);
  const [notApproved, setNotApproved] = useState(true);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };

  let title = "title undefind";
  if (auth.currentUser?.email === "krel.svyatoslav@gmail.com") {
    title = "Admin";
    //TODO: delete this part
    useEffect(() => {
      setNotApproved(false);
    }, []);
  }

  let sql = 'select * from cart';
  let params = [];
  db.transaction((txn) => {
    txn.executeSql(sql, params, (trans, results) => {
        console.log("count = " + results.rows.length);
        setItemsDB(results.rows.length);
        //console.log("execute success transaction: " + JSON.stringify(trans))
        //resolve(results);
        //resolve(trans);
        //return results;
    },
        (error) => {
        console.log("execute error: " + JSON.stringify(error))
        return(error);
    });
});

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={[styles.screenTitle]}>My Profile</Text>
        <Image
          source={require("../assets/Header-Icon-User.png")}
          style={styles.profileImg}
        />
        <Text
          style={{ fontStyle: "italic", alignSelf: "flex-end", margin: 10 }}
        >
          {auth.currentUser?.email}, {title}
        </Text>

        {notApproved ? (
          <Text style={{ padding: 10, alignSelf: 'center' }}>
            Ups... Your company is not registered in the system. Reach out to us via
            appforconstruction@gmail.com.
          </Text>
        ) : null}

        <Text
          style={{
            fontStyle: "italic",
            alignSelf: "center",
            margin: 30,
            color: "#365eff",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          {" "}
          Back to Home screen...{" "}
        </Text>
      </View>

      
        <Text style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 18 }}>
          Your Activity
        </Text>

        <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.itemsInCart}>
          <Text style={[styles.textItemsInCart]}> {itemsDB} </Text>
          <Text style={{ paddingTop: 2, fontSize: 12, alignSelf: "center", color: '#ffffff' }}>
          Items In Cart
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.totalCost}>
          <Text style={[styles.textItemsInCart]}> ? </Text>
          <Text style={{ paddingTop: 2, fontSize: 12, alignSelf: "center", color: '#ffffff' }}>
          Total Cost
        </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
        {notApproved ? (
          <TouchableOpacity style={styles.buttonDeck}>
            <MaterialCommunityIcons
              name="salesforce"
              size={24}
              color="#9c9c9c"
            />
            <Text style={[styles.buttontextdisabled]}> CRM </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonDeck}>
            <MaterialCommunityIcons
              name="salesforce"
              size={24}
              color="#000000"
            />
            <Text style={[styles.buttontext]}> CRM </Text>
          </TouchableOpacity>
        )}

        {notApproved ? (
          <TouchableOpacity style={styles.buttonDeck}>
            <MaterialCommunityIcons
              name="rotate-3d"
              size={22}
              color="#9c9c9c"
            />
            <Text style={[styles.buttontextdisabled]}> BIM </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonDeck}>
            <MaterialCommunityIcons
              name="rotate-3d"
              size={22}
              color="#000000"
            />
            <Text style={[styles.buttontext]}> BIM </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.buttonDeck} onPress={signOutUser}>
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
    height: 40,
    width: 40,
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
  itemsInCart: {
    alignItems: "center",
    backgroundColor: "#146aff",
    height: 100,
    margin: 16,
    padding: 10,
    borderRadius: 50,
    width: 100,
    alignSelf: "center",
    justifyContent: "center",
  },
  textItemsInCart: {
    fontSize: 36,
    color: "#ffffff",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  totalCost: {
    alignItems: "center",
    backgroundColor: "#0ca620",
    height: 100,
    //margin: 16,
    //padding: 10,
    borderRadius: 50,
    width: 100,
    alignSelf: "center",
    justifyContent: "center",
  }
});

export default MyProfile;
