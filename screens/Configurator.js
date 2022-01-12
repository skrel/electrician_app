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
import Svg, { Circle, Rect, Line } from "react-native-svg";

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
  const [groundIsEnabled, setGroundIsEnabled] = useState(false);
  const [mudringIsEnabled, setMudringIsEnabled] = useState(false);
  const [extensionringIsEnabled, setExtensionringIsEnabled] = useState(false);
  const [coverplateIsEnabled, setCoverplateIsEnabled] = useState(false);
  const [deviceIsEnabled, setDeviceIsEnabled] = useState(false);
  const [tlkoIsEnabled, setTlkoIsEnabled] = useState(false);
  const [tckoIsEnabled, setTckoIsEnabled] = useState(false);
  const [trkoIsEnabled, setTrkoIsEnabled] = useState(false);

  const boxToggleSwitch = () =>
    setBoxIsEnabled((previousState) => !previousState);
  const bracketToggleSwitch = () =>
    setBracketIsEnabled((previousState) => !previousState);
  const groundToggleSwitch = () =>
    setGroundIsEnabled((previousState) => !previousState);
  const mudringToggleSwitch = () =>
    setMudringIsEnabled((previousState) => !previousState);
  const extensionringToggleSwitch = () =>
    setExtensionringIsEnabled((previousState) => !previousState);
  const coverplateToggleSwitch = () =>
    setCoverplateIsEnabled((previousState) => !previousState);
  const deviceToggleSwitch = () =>
    setDeviceIsEnabled((previousState) => !previousState);
  const tlkoToggleSwitch = () =>
    setTlkoIsEnabled((previousState) => !previousState);
  const tckoToggleSwitch = () =>
    setTckoIsEnabled((previousState) => !previousState);
  const trkoToggleSwitch = () =>
    setTrkoIsEnabled((previousState) => !previousState);

  let itemImage = "https://skrel.github.io/jsonapi/image/na.png";
  const [itemName, setItemName] = React.useState(null);
  const [boxDescription, setBoxDescription] = useState("");
  const [bracketDescription, setBracketDescription] = useState("");
  const itemDescription =
    '{"box":"' + boxDescription + '","bracket":"' + bracketDescription + '"}';
  const itemQty = "add quantity";

  //counter
  const [counter, setCounter] = useState(0);

  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  const add = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into cart (image, name, purpose, qty) values (?, ?, ?, ?)",
          [itemImage, itemName, itemDescription, itemQty]
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

      <View style={{ flex: 1, padding: 10 }}>
        <Svg height="100%" width="100%">
          {boxIsEnabled ? (
            [
              <Line
                x1="100"
                y1="100"
                x2="100"
                y2="250"
                stroke="red"
                strokeWidth="2"
              />,
              <Line
                x1="250"
                y1="100"
                x2="250"
                y2="250"
                stroke="red"
                strokeWidth="2"
              />,
              <Line
                x1="100"
                y1="250"
                x2="250"
                y2="250"
                stroke="red"
                strokeWidth="2"
              />,
              <Line
                x1="100"
                y1="100"
                x2="250"
                y2="100"
                stroke="red"
                strokeWidth="2"
              />,
            ]
          ) : (
            <Circle cx="10" cy="10" r="5" strokeWidth="2.5" fill="green" />
          )}
        </Svg>
      </View>

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
          <View style={styles.flexRow} borderRadius="20">
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Assembly Name
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="Type Assembly Name here"
              onChangeText={(text) => setItemName(text)}
              value={itemName}
              maxLength={18}
            />
          </View>

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
          <View style={{ flex: 1 }}>
            {boxIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                onChangeText={(text) => setBoxDescription(text)}
                value={boxDescription}
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
          <View style={{ flex: 1 }}>
            {bracketIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                onChangeText={(text) => setBracketDescription(text)}
                value={bracketDescription}
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
                thumbColor={groundIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={groundToggleSwitch}
                value={groundIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {groundIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
                thumbColor={mudringIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={mudringToggleSwitch}
                value={mudringIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {mudringIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
                thumbColor={extensionringIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={extensionringToggleSwitch}
                value={extensionringIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {extensionringIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
                thumbColor={coverplateIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={coverplateToggleSwitch}
                value={coverplateIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {coverplateIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
                thumbColor={deviceIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={deviceToggleSwitch}
                value={deviceIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {deviceIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
          </View>

          <View style={styles.flexRow}>
            <Text
              style={{ paddingLeft: 20, fontStyle: "italic", fontSize: 22 }}
            >
              Top Left KO
            </Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={tlkoIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={tlkoToggleSwitch}
                value={tlkoIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {tlkoIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
                thumbColor={tckoIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={tckoToggleSwitch}
                value={tckoIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {tckoIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
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
                thumbColor={trkoIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={trkoToggleSwitch}
                value={trkoIsEnabled}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {trkoIsEnabled ? (
              <TextInput
                style={styles.input}
                placeholder="Type box name here"
                maxLength={18}
              />
            ) : (
              <TextInput
                style={styles.inputHidden}
                placeholder="Type box name here"
                maxLength={18}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              add(), handleClick1();
            }}
          >
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
  },
});

export default Configurator;
