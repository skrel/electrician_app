import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Modal,
  TextInput
} from "react-native";
import * as SQLite from "expo-sqlite";

import { sendEmail } from "../components/SendEmail.js";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import database from '../firebase'
import { auth } from "../firebase";

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

const ShopingCart = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [listProject, setListProject] = useState([])
  const [forceUpdate] = useForceUpdate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectProject, setSelectedProject] = useState({});

  const [promtUserToRegister, setPromtUserToRegister] = useState(false);

  //output only name purpose and qty
  let rawEmailString = JSON.stringify(flatListItems, ["name", "purpose", "qty"]);
//   console.log(rawEmailString);
  //delete all quotes
  let emailStringWithNoQuots = rawEmailString.replace(/"/g, "");
  //replace comas with line breaks 
  let emailStringWithNoComas = emailStringWithNoQuots.replace(/,/g, "\n");
  //replace front and back brackets
  let emailStringWithNoBrackets = emailStringWithNoComas.slice(2,-2);
  //remove curly brackets
  let emailStringWithNoFrontCrlBrackets = emailStringWithNoBrackets.replace(/{/g, "\n");
  let emailStringWithNoBackCrlBrackets = emailStringWithNoFrontCrlBrackets.replace(/}/g, "");

  useEffect(() => {
    getListProject()
  }, [modalVisible])

  const getListProject = async () => {
    let xUser = auth.currentUser.uid;
    if(xUser !== null){
      database.collection('users').where('userId', '==', auth.currentUser.uid ).get().then( async(snapshot) => {
        // let data = snapshot.data();
        let response = []
        snapshot
          .forEach(documentSnapshot => {
            item = {...documentSnapshot.data(), id: documentSnapshot.id};
            response.push(item)
          });
        setListProject(response)
        // console.log(response)
      });
    } else {
      setPromtUserToRegister(true);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      db.transaction((tx) => {
        tx.executeSql("select * from cart", [], (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        setFilteredDataSource(temp);
          setMasterDataSource(temp);
        });
      });
    });
    return unsubscribe;
  }, [navigation]);

  const clear = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from cart");
        // tx.executeSql("select * from cart", [], (_, { rows }) =>
        //   console.log(JSON.stringify(rows))
        // );
        Alert.alert(
          "Success",
          "All items were deleted",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("Home"),
            },
          ],
          { cancelable: false }
        );
      },
      null,
      forceUpdate
    );
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSaveItemToFirebase = (item) => {
    database.collection('users').doc(item?.id).update({
      projects: [...flatListItems]
    })
    setModalVisible(false);
  }

  const renderProject = ({item, index}) => (
    <TouchableOpacity style={styles.projectItem} onPress={() => handleSaveItemToFirebase(item)}>
      {item?.id !== selectProject?.id ? (
        <Ionicons name="radio-button-off" size={24} color="black" />
      ) : (
        <Ionicons name="radio-button-on" size={24} color="black" />
      )}
      <Text style={styles.projectText}>{item?.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>Cart</Text>
      <TextInput
          style={styles.input}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, padding: 5 }}>
          <FlatList
            data={filteredDataSource} //flatListItems
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Shopping Cart Item", {
                    itemId: item.id,
                    value: item.name,
                    image: item.image,
                    purpose: item.purpose,
                    qty: item.qty,
                    price: item.price,
                  })
                }
              >
                <View
                  style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: item.image }}
                  />
                  <View style={{ flex: 1, padding: 10 }}>
                    <Text style={[styles.titletext]}>{item.name}</Text>
                    <Text numberOfLines={1}>{item.purpose}</Text>
                    <Text style={styles.innerText}>QTY: {item.qty}</Text>
                    <Text style={[styles.price]}>$ {item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonDeck} onPress={clear}>
            <AntDesign name="delete" size={22} color="black" />
              <Text style={styles.buttontext}>Emt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDeck}
              onPress={() => navigation.navigate("Add My Own Item")}
            >
              <Entypo name="add-to-list" size={22} color="black" />
              <Text style={styles.buttontext}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDeck}
              onPress={() => setModalVisible(true)}
            >
              <AntDesign name="addfolder" size={22} color="black" />
              <Text style={styles.buttontext}>Prj</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.buttonDeck} onPress={() => navigation.navigate("Send", {cartContent: rawEmailString})}>
            <MaterialCommunityIcons name="email-send-outline" size={22} color="black" />
              <Text style={styles.buttontext}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal animationType="fade"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        >
        <View style={styles.popupView}>
          <View style={styles.modalContentView}>
            <Text style={[styles.titletext]}>Select Project</Text> 
            {promtUserToRegister ? <Text style={[styles.messageText]}>You don't have access to your projects. Please create a profile</Text> : null}
            <View>
                <FlatList
                  data={listProject}
                  renderItem={renderProject}
                  keyExtractor={({ id }) => id.toString()}
                />
                <TouchableOpacity style={styles.buttonView} onPress={() => setModalVisible(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  buttontext: {
    //fontWeight: "bold",
    fontSize: 9,
    marginTop: 2,
    color: "#000000",
  },
  projectText: {
    fontSize: 14,
    marginLeft: 10
  },
  innerText: {
    color: "#0000ff",
    paddingTop: 5,
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 16,
  },
  messageText: {
    //fontWeight: "bold",
    fontSize: 14,
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
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
  price: {
    backgroundColor: "#03a80e",
    color: "#ffffff",
    //width: 80,
    maxWidth:80,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 9,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 16,
    textAlignVertical: 'bottom',
    marginTop: 10,
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
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  buttonView: {
    borderWidth: 1,
    width: 100,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: 'black',
    marginTop:15,
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#f7f7f7",
  },
});

export default ShopingCart;
