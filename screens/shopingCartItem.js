import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";

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

function shopingCartItem({ route, navigation }) {
  const { itemId } = route.params;
  const { value } = route.params;
  const { image } = route.params;
  const { purpose } = route.params;
  const { qty } = route.params;

  const [forceUpdate] = useForceUpdate();
  const [text, setText] = React.useState(null);

  const deleteItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from cart where id=?", [itemId]);
        tx.executeSql("select * from cart", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
        Alert.alert(
          "Success",
          "Item " + value + " was deleted",
          [
            {
              text: "Ok",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
      },
      null,
      forceUpdate
    );
  };

  const addQty = (text) => {
    if (text === null || text === "") {
      return false;
    }
    db.transaction(
      (tx) => {
        tx.executeSql("update cart set qty=? where id=?", [text, itemId]);
        tx.executeSql("select * from cart", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>Cart Item</Text>
        <View style={styles.container}>
          <Image style={{ width: 250, height: 250 }} source={{ uri: image }} />
        </View>

        <View style={styles.itemcard}>
          <Text style={styles.titletext}>
            Item Name: {JSON.stringify(value)}{" "}
          </Text>
          <Text style={styles.normaltext}>
            Used for {JSON.stringify(purpose)}
          </Text>
          <Text style={styles.normaltext}>
            Residential and comersial construction. Can be used in assemblies
            with other electrical items
          </Text>
          <Text> </Text>
          <Text style={styles.titletext}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder={JSON.stringify(qty)}
            onChangeText={(text) => setText(text)}
            onSubmitEditing={() => {
              addQty(text);
            }}
            maxLength={12}
          />
        </View>

        <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonDelete} onPress={deleteItem}>
            <Text style={[styles.buttontext]}> Delete Item </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttontext]}> Update Item </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    backgroundColor: "#e6e6e6",
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
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: 'italic',
    //textDecorationLine: 'underline',
  },
});

export default shopingCartItem;
