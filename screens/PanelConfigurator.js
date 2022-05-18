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
import { ASSEMBLY_TYPE_LOCAL } from '../components/Constants.js'

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

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const AssemblyType = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const PanelConfigurator = () => {
  const [forceUpdate] = useForceUpdate();
  //const itemImage = "https://skrel.github.io/jsonapi/image/na.png";
  const [itemName, setItemName] = useState("Assembly Name");
  const [selectedAssemblyTypeId, setSelectedAssemblyTypeId] = useState(null);
  const [assemblyTypeDescription, setAssemblyTypeDescription] = useState("custom");
  const [image, setImage] = useState("https://skrel.github.io/jsonapi/image/na.png");
  let DEFAULT_PRICE = '0.01';

  //this is what horizontal flatlist returns
  const renderHorizontalListItem = ({ item }) => {
    const backgroundColor = item.id === selectedAssemblyTypeId ? "#000000" : "#ffffff";
    const color = item.id === selectedAssemblyTypeId ? 'white' : 'black';

    return (
      <AssemblyType
        item={item}
        onPress={() => {setSelectedAssemblyTypeId(item.id), setAssemblyTypeDescription(item.title), setImage(item.img)}}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  //counter
  const [counter, setCounter] = useState(0);
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>Panel Configurator</Text>
      <Text style={[styles.textSmall]}>{counter} items added</Text>

      {/* assembly type view */}
      <View style={styles.flexRow}>
            {/* <Text style={{ paddingLeft: 20, fontSize: 14 }}>Assembly Type</Text> */}
            <FlatList
              horizontal={true}
              data={ASSEMBLY_TYPE_LOCAL}
              renderItem={renderHorizontalListItem}
              keyExtractor={(item) => item.id}
              extraData={selectedAssemblyTypeId}
            />
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default PanelConfigurator;