import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
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

const SeeAll = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>See All</Text>
      <View style={{ flex: 1, padding: 5 }}>
        <FlatList
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginBottom: 10,
                borderColor: "black",
                borderWidth: 2,
                margin: 10,
              }}
            >
              <Image
                style={{ width: 100, height: 100, marginTop: 20 }}
                source={{ uri: item.image }}
              />
              <View style={{ flex: 1, padding: 10 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontStyle: "italic",
                  }}
                >
                  Spoolsheet
                </Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5, borderTopColor: '#ffffff' }}>
                  Name:
                </Text>
                <Text>{item.name}</Text>

                <Text style={{ fontWeight: "bold", borderTopWidth: 5, borderTopColor: '#ffffff' }}>
                  Description:
                </Text>
                <Text>{item.purpose.replace(/,/g, "\n")}</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5, borderTopColor: '#ffffff' }}>
                  Quantity:
                </Text>
                <Text >{item.qty}</Text>

                <Text style={{ fontWeight: "bold", borderTopWidth: 5, borderTopColor: '#ffffff' }}>
                  Cost, $:
                </Text>
                <Text style={[styles.price]}>{item.price}</Text>

                {/* <Text style={{ fontWeight: "bold", borderTopWidth: 5, borderTopColor: '#ffffff' }}>
                  Suppliers:
                </Text>
                <Text style={[styles.suppliers]}>Sign In For Supplier</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5, borderTopColor: '#ffffff' }}>
                  Locations:
                </Text>
                <Text style={[styles.location]}>Sign In For Geolocation</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5, borderTopColor: '#ffffff' }}>
                  Catalog:
                </Text>
                <Text style={[styles.catalog]}>Sign In For Catalog</Text> */}
                
                
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    maxWidth: 80,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 9,
    fontWeight: "bold",
  },
  suppliers: {
    backgroundColor: "#7900ad",
    color: "#ffffff",
    //width: 80,
    maxWidth: 100,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 9,
    fontWeight: "bold",
  },
  location: {
    backgroundColor: "#0006ad",
    color: "#ffffff",
    //width: 80,
    maxWidth: 100,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 9,
    fontWeight: "bold",
  },
  catalog: {
    backgroundColor: "#ad0000",
    color: "#ffffff",
    //width: 80,
    maxWidth: 100,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 9,
    fontWeight: "bold",
  },
  buttonDeck: {
    alignItems: "center",
    backgroundColor: "#438a48",
    flex: 1,
    height: 42,
    margin: 16,
    padding: 10,
    borderRadius: 10,
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff",
  },
});

export default SeeAll;
