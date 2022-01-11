import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Switch,
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

const Configurator = () => {
  const [forceUpdate] = useForceUpdate();

  const [boxIsEnabled, setBoxIsEnabled] = useState(false);
  const [bracketIsEnabled, setBracketIsEnabled] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);

  const boxToggleSwitch = () =>
    setBoxIsEnabled((previousState) => !previousState);
  const bracketToggleSwitch = () =>
    setBracketIsEnabled((previousState) => !previousState);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //counter
  const [counter, setCounter] = useState(0);

  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
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
      <Text style={[styles.screenTitle]}>Configurator</Text>
      <Text style={[styles.textSmall]}>{counter} items added</Text>

      <View style={{ flex: 1, padding: 10 }}></View>

      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 14 }}>
          Build Your Assembly
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
        <ScrollView style={{ backgroundColor: "white" }}>
          <View
            style={styles.flexRow}
            backgroundColor="#e6e6e6"
            borderRadius="20"
          >
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Box
            </Text>
            <TextInput
              style={styles.inputHidden}
              placeholder="Type here"
              maxLength={18}
            />
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={boxIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={boxToggleSwitch}
                value={boxIsEnabled}
              />
            </View>
          </View>
          <View style={styles.flexRow}>
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Bracket
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={bracketIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={bracketToggleSwitch}
                value={bracketIsEnabled}
              />
            </View>
          </View>
          <View
            style={styles.flexRow}
            backgroundColor="#e6e6e6"
            borderRadius="20"
          >
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Ground
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.flexRow}>
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Mud Ring
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View
            style={styles.flexRow}
            backgroundColor="#e6e6e6"
            borderRadius="20"
          >
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Extension Ring
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.flexRow}>
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Cover Plate
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View
            style={styles.flexRow}
            backgroundColor="#e6e6e6"
            borderRadius="20"
          >
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Device
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.flexRow}>
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Top left KO
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View
            style={styles.flexRow}
            backgroundColor="#e6e6e6"
            borderRadius="20"
          >
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Top Center KO
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.flexRow}>
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Top Right KO
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttontext]}> Add Item </Text>
          </TouchableOpacity>
        </ScrollView>
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
    padding: 10,
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
    paddingRight: 10,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff",
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
  toggleSwitchContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  inputHidden: {
    width: 0,
    height: 0,
  }
});

export default Configurator;
