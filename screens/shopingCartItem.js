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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import * as SQLite from "expo-sqlite";
//import { borderTopColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { AntDesign } from '@expo/vector-icons';
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

const { height } = Dimensions.get("window");

function ShopingCartItem({ route, navigation }) {
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

  const Dublicate = () => {
    Alert.alert(
      "Ups, something went wrong...",
      "Please register your company with us to enable this feature.",
      [
        {
          text: "Ok",
          //onPress: () => navigation.navigate("Home"),
        },
      ],
      { cancelable: false }
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

  let purposeString = JSON.stringify(purpose);
  let purposeToDisplay = purposeString.replace(/,/g, "\n");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={[styles.screenTitle]}>Cart Item</Text>

        <View style={styles.itemcard}>
          <View style={styles.flexRow}>
            <Text style={{ paddingLeft: 20, fontSize: 20 }}>Quantity:</Text>
            <View style={{ flex: 1, paddingLeft: 20 }}>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                defaultValue={JSON.stringify(qty).replace(/"/g, "")}
                //placeholder={JSON.stringify(qty)}
                onChangeText={(text) => setText(text)}
                onSubmitEditing={() => {
                  addQty(text);
                }}
                maxLength={12}
              />
            </View>
          </View>

          <Text style={{ paddingLeft: 20, fontSize: 20, paddingBottom: 20 }}>
            Item Name: {JSON.stringify(value)}{" "}
          </Text>
          <Text style={styles.normaltext}>Description {purposeToDisplay.replace(/"/g, "\n")}</Text>
          <Text style={styles.normaltext}>
            Residential and comersial construction. Can be used in assemblies
            with other electrical items
          </Text>
        </View>

        <View style={styles.container}>
          <Image style={{ width: 250, height: 250 }} source={{ uri: image }} />
        </View>

        <View style={styles.flexRow}>
          
          <TouchableOpacity style={styles.buttonDeck} onPress={deleteItem}>
            <AntDesign name="delete" size={24} color="black" />
            <Text style={[styles.buttontext]}> Delete Item </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonDeck}
            onPress={() => {
              addQty(text);
            }}
          >
            <MaterialCommunityIcons name="update" size={24} color="black" />
            <Text style={[styles.buttontext]}> Update Item </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDeck} onPress={Dublicate}>
            <Ionicons name="duplicate-outline" size={24} color="black" />
            <Text style={[styles.buttontext]}> Duplicate Item </Text>
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
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
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
  },
  input: {
    height: 25,
    margin: 0,
    marginBottom: 6,
    borderWidth: 1,
    borderBottomColor: "black",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    alignSelf: "stretch",
    fontSize: 25,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
  keyboardContainer: {
    flex: 1,
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
});

export default ShopingCartItem;
