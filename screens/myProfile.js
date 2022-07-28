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
  ScrollView,
  Modal,
  Dimensions
} from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import * as SQLite from "expo-sqlite";
//import ConvertingDateToString from '../components/Functions.js';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
//import { ScrollView } from "react-native-web";
import { MaterialIcons } from '@expo/vector-icons';
import database from '../firebase'

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

let ConvertingDateToString = require("../components/Functions.js");

const MyProfile = ({ route }) => {
  const navigation = useNavigation();
  const [itemsDB, setItemsDB] = useState(0);
  const [notApproved, setNotApproved] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState('')
  //last login data from firebase
  const { lastLogin } = route.params;
  const { createdAt } = route.params;
  let sDate_lastLogin =
    ConvertingDateToString.ConvertingDateToString(lastLogin);
  let lastLoginTrimmed = sDate_lastLogin.slice(4, 15);
  let sDate_createdAt =
    ConvertingDateToString.ConvertingDateToString(createdAt);
  let createdAtTrimmed = sDate_createdAt.slice(0, 15);

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

  

  //query amount of items in sqlite
  let sql = "select * from cart";
  let sqlPrice = "select qty, price from cart";
  let params = [];
  db.transaction((txn) => {
    txn.executeSql(
      sql,
      params,
      (trans, results) => {
        console.log("count = " + results.rows.length);
        setItemsDB(results.rows.length);
      },
      (error) => {
        console.log("execute error: " + JSON.stringify(error));
        return error;
      }
    );
  });

  //query price from sqlite
  db.transaction((txn) => {
    txn.executeSql(sqlPrice, params, (trans, results) => {
      let listVar = [];
      for (let i = 0; i < results.rows.length; ++i) {
        let row = results.rows.item(i);
        let rowPrice = row.price;
        let rowQty = row.qty;
        let totalPricePerRow = rowPrice * rowQty;
        listVar.push(totalPricePerRow);
      }

      let sum = listVar.reduce(function (a, b) {
        return a + b;
      }, 0);
      let finish = Number(sum.toFixed(0));
      setTotalPrice(finish);
    });
  });

  const addNewProject = async () => {
    if(projectName) {
      const data = {
        userId: auth.currentUser.uid,
        name: projectName,
        projects: []
      }
      await database.collection('users').add(data);
      setModalVisible(false)
    }
  }

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
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
          <Text
            style={{
              fontStyle: "italic",
              alignSelf: "flex-end",
              marginRight: 10,
            }}
          >
            Created: {createdAtTrimmed}
          </Text>

          {notApproved ? (
            <Text style={{ padding: 10, alignSelf: "center" }}>
              Ups... Your company is not registered in the system. Reach out to
              us via appforconstruction@gmail.com.
            </Text>
          ) : null}

          <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate("Home")}>
        <Text style={[styles.buttontextRegister]}> Back To Home Screen ... </Text>
      </TouchableOpacity>

        </View>

        <Text style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 18 }}>
          Your Activity
        </Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.itemsInCart}>
            <Text style={[styles.textItemsInCart]}> {itemsDB} </Text>
            <Text
              style={{
                paddingTop: 2,
                fontSize: 12,
                alignSelf: "center",
                color: "#000000",
              }}
            >
              Items In Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.totalCost}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[styles.textItemsInCart]}
            >
              ${totalPrice}+
            </Text>
            <Text
              style={{
                paddingTop: 2,
                fontSize: 12,
                alignSelf: "center",
                color: "#000000",
              }}
            >
              Total Cost
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lastLogin}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[styles.textItemsInCart]}
            >
              {" "}
              {lastLoginTrimmed}{" "}
            </Text>
            <Text
              style={{
                paddingTop: 2,
                fontSize: 12,
                alignSelf: "center",
                color: "#000000",
              }}
            >
              Last Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

        <TouchableOpacity style={styles.buttonDeck} onPress={() => navigation.navigate('ListMyProject')}>
          <MaterialCommunityIcons name="format-list-bulleted" size={24} color="black" />
          <Text style={[styles.buttontext]}> Projects </Text>
        </TouchableOpacity>

        {notApproved ? (
          <TouchableOpacity style={styles.buttonDeck}>
            <MaterialCommunityIcons
              name="rotate-3d"
              size={22}
              color="#9c9c9c"
            />
            <Text style={[styles.buttontextdisabled]}> CSV </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonDeck}>
            <MaterialCommunityIcons
              name="rotate-3d"
              size={22}
              color="#000000"
            />
            <Text style={[styles.buttontext]}> CSV </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.buttonDeck} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add" size={24} color="black" />
          <Text style={[styles.buttontext]}> Add </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDeck} onPress={signOutUser}>
          <FontAwesome name="sign-out" size={24} color="black" />
          <Text style={[styles.buttontext]}> Sing </Text>
          <Text style={[styles.buttontext]}> Out </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    <Modal animationType="fade"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        >
        <View style={styles.popupView}>
          <View style={styles.modalContentView}>
            <Text style={[styles.titlePopuptext]}>Enter Project Name</Text> 
            <TextInput style={styles.inputView} placeholder="Name project..." onChangeText={(text) => setProjectName(text)}/>
            <View style={[styles.flexRow, styles.backgroundButtonModal]}>
              <TouchableOpacity style={styles.buttonView} onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonView} onPress={addNewProject}>
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    margin: 0,
    padding: 3,
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
    backgroundColor: "#d4d4cf",
    height: 100,
    margin: 16,
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  textItemsInCart: {
    fontSize: 36,
    color: "#000000",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowRadius: 2,
    // shadowOpacity: 0.5,
  },
  totalCost: {
    alignItems: "center",
    backgroundColor: "#d4d4cf",
    height: 100,
    marginRight: 16,
    //padding: 10,
    borderRadius: 20,
    width: 100,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  lastLogin: {
    alignItems: "center",
    backgroundColor: "#d4d4cf",
    height: 100,
    //margin: 16,
    //padding: 10,
    borderRadius: 20,
    width: 100,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('window').height,
  },
  modalContentView: {
    margin: 20,
    width: Dimensions.get('screen').width - 40,
    height: 230,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingTop: 40,
    // alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundButtonModal: {
    justifyContent: 'space-between',
  },
  titlePopuptext: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red'
  },
  inputView: {
    padding: 15, 
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    marginVertical: 20
  },
  buttonView: {
    borderWidth: 1,
    width: 100,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: 'red'
  },
  buttonRegister: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    marginTop: 16,
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    borderWidth: 2,
  },
  buttontextRegister: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000000",
  },
});

export default MyProfile;
