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

  let emailString = JSON.stringify(flatListItems, ["name", "qty"]);
  let newEmailtring = emailString.replace(/"/g, "");


  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      db.transaction((tx) => {
        tx.executeSql("select * from cart", [], (tx, results) => {
          var temp = [];
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
                    <Text>{item.purpose}</Text>
                    <Text style={styles.innerText}>QTY: {item.qty}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonDelete} onPress={clear}>
              <Text style={styles.buttontext}>Delete All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonadd}
              onPress={() => navigation.navigate("Add My Own Item")}
            >
              <Text style={styles.buttontext}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonsend}
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
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff",
  },
  buttonsend: {
    alignItems: "center",
    backgroundColor: "#002fff",
    flex: 1,
    height: 42,
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
  buttonadd: {
    alignItems: "center",
    backgroundColor: "#438a48",
    flex: 1,
    height: 42,
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
  innerText: {
    color: "#0000ff",
    paddingTop: 5,
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    flex: 1,
    height: 42,
    margin: 16,
    padding: 10,
    borderRadius: 10,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default ShopingCart;
