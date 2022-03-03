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
                style={{ width: 100, height: 100 }}
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
                  Spoolsheet OAR-0190
                </Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  Name:
                </Text>
                <Text>{item.name}</Text>
              
                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  Description:
                </Text>
                <Text>{item.purpose}</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  Quantity:
                </Text>
                <Text style={{ borderBottomWidth: 5 }}>{item.qty}</Text>

                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  Total Cost:
                </Text>
                <Text>Sign In For Price</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  Suppliers:
                </Text>
                <Text>Sign In For Supplier</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  Locations:
                </Text>
                <Text>Sign In For Geilocation</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  Catalog:
                </Text>
                <Text>Sign In For Catalog</Text>
                <Text style={{ fontWeight: "bold", borderTopWidth: 5 }}>
                  More:
                </Text>
                <Text style={styles.normaltext}>
                  Residential and comersial construction. Can be used in
                  assemblies with other electrical items
                </Text>
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
    fontSize: 40,
    fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default SeeAll;
