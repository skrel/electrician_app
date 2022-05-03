import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { BOX } from "../components/Constants.js";
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

const Box = (props) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [forceUpdate] = useForceUpdate();

  // Check for user status
  let BOX = "https://skrel.github.io/jsonapi/public/json/box.json";
  if (auth.currentUser?.email === "krel.svyatoslav@gmail.com") {
    BOX = "https://skrel.github.io/jsonapi/admin/json/box.json";
  }

  //counter
  const [counter, setCounter] = useState(0);

  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  useEffect(() => {
    setLoading(true);
    fetch(BOX) //change link
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const add = (item) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into cart (image, name, purpose, qty) values (?, ?, ?, ?)",
          [item.image, item.name, item.purpose, item.qty]
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
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={[styles.screenTitle]}>Box</Text>
        <Text style={[styles.textSmall]}>{counter} items added</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        {isLoading ? (
          <Text>Loading....</Text>
        ) : (
          <FlatList
            data={filteredDataSource}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.id), add(item), handleClick1();
                }}
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
                    <Text>{item.website}</Text>
                    <Text style={[styles.price]}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
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
  titletext: {
    fontWeight: "bold",
    fontSize: 16,
  },
  normaltext: {
    fontSize: 14,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
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
  price: {
    backgroundColor: "#d4c00d",
    color: "#ffffff",
    //width: 80,
    maxWidth: 80,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 9,
    fontWeight: "bold",
  },
});

export default Box;
