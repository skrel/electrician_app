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
} from "react-native";
import * as SQLite from "expo-sqlite";

import { sendEmail } from "../components/sendEmail.js";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
  const [forceUpdate] = useForceUpdate();

  let emailString = JSON.stringify(flatListItems, ["name", "purpose", "qty"]);
  let newEmailtring = emailString.replace(/"/g, "");


  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      db.transaction((tx) => {
        tx.executeSql("select * from cart", [], (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
    });
    return unsubscribe;
  }, [navigation]);

  const clear = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from cart");
        tx.executeSql("select * from cart", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>Cart</Text>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, padding: 5 }}>
          <FlatList
            data={flatListItems}
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
                    <Text style={[styles.price]}>Sign In For Price</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <Text style={[styles.totalPrice]}>Total: $ XXXX.XX</Text>

          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonDeck} onPress={clear}>
            <AntDesign name="delete" size={24} color="black" />
              <Text style={styles.buttontext}>Empty</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDeck}
              onPress={() => navigation.navigate("Add My Own Item")}
            >
              <Entypo name="add-to-list" size={24} color="black" />
              <Text style={styles.buttontext}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDeck} onPress={() => navigation.navigate("See All")}>
            <Ionicons name="file-tray-full-outline" size={24} color="black" />
              <Text style={styles.buttontext}>See All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDeck}
              onPress={() => {
                sendEmail(
                  "",
                  "",
                  "This was sent from electrician-app -- " +
                  newEmailtring.replace(/,/g, "\n"),
                  { cc: "" }
                ).then(() => {
                  console.log("Your message was successfully sent!");
                });
              }}
            >
              <MaterialCommunityIcons name="email-send-outline" size={24} color="black" />
              <Text style={styles.buttontext}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    fontSize: 10,
    marginTop: 2,
    color: "#000000",
  },
  innerText: {
    color: "#0000ff",
    paddingTop: 5,
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 16,
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
    backgroundColor: "#d4c00d",
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
});

export default ShopingCart;
