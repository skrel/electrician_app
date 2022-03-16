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
import * as SQLite from "expo-sqlite";

//use this alert
//alert('Id : ' + item.id + ' Title : ' + item.title);

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

function addMyOwnItem() {
  const [forceUpdate] = useForceUpdate();
  let itemImage = "https://skrel.github.io/jsonapi/image/na.png";
  const [itemName, setItemName] = React.useState(null);
  const [itemDescription, setItemDescription] = useState("");
  //const [itemQuantity, setItemQuantity] = useState("");

  let itemQuantity = 'add quantity';

  //counter
  const [counter, setCounter] = useState(0);

  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  const addItem = () => {
    db.transaction(
      function (tx) {
        tx.executeSql(
          "insert into cart (image, name, purpose, qty) values (?,?,?,?)",
          [itemImage, itemName, itemDescription, itemQuantity]
        );
        tx.executeSql("select * from cart", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                                accessible={false}>
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <Text style={[styles.screenTitle]}>Add Item</Text>
          <Text style={[styles.textSmall]}>{counter} items added</Text>
          <Text style={styles.titletext}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            onChangeText={(text) => setItemName(text)}
            value={itemName}
            maxLength={18}
          />

          <Text style={styles.titletext}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            onChangeText={(text) => setItemDescription(text)}
            value={itemDescription}
            maxLength={35}
          />

        </View>
        </TouchableWithoutFeedback>

      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addItem(), handleClick1();
          }}
        >
          <Text style={[styles.buttontext]}> Add Item </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    backgroundColor: "#438a48",
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
    borderRadius: 20,
    padding: 10,
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

export default addMyOwnItem;
