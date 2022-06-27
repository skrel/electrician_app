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
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SQLite from "expo-sqlite";

import { sendEmail } from "../components/SendEmail.js";

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

const Send = ({ route, navigation }) => {

    const { cartContent } = route.params;

    let rawText = JSON.stringify(cartContent);
    let textWithNoQuotes = rawText.replace(/"/g, "");
    let textStringWithNoComas = textWithNoQuotes.replace(/,/g, "\n");
    let textStringWithNoFrontCrlBrackets = textStringWithNoComas.replace(/{/g, "\n");
    let textStringWithNoBackCrlBrackets = textStringWithNoFrontCrlBrackets.replace(/}/g, "");
    let textStringWithNoFrontAndBackBrackets = textStringWithNoBackCrlBrackets.slice(1,-1);
    let textStringWithNoSlashes = textStringWithNoFrontAndBackBrackets.replaceAll("\\", "");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
                    <Text style={[styles.screenTitle]}>Send</Text>
                        <TextInput
                            style={styles.input}
                            multiline='true'
                            //onChangeText={(text) => searchFilterFunction(text)}
                            value={textStringWithNoSlashes}
                            underlineColorAndroid="transparent"
                            placeholder="Items to send"/>
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text style={[styles.buttontext]}> Copy Content </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            sendEmail(
              "",
              "",
              "BOM from electrician-app -- \n \n" +
              textStringWithNoSlashes,
              { cc: "" }
            ).then(() => {
              console.log("Your message was successfully sent!");
            });
          }}
        >
          <Text style={[styles.buttontext]}> Email </Text>
        </TouchableOpacity>
      </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexRow: {
      flexDirection: "row",
    },
    input: {
        height: '75%',
        margin: 6,
        borderWidth: 1,
        borderColor: "#f7f7f7",
        borderRadius: 10,
        padding: 10,
        width: "90%",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#f7f7f7",
      },
      screenTitle: {
        margin: 2,
        padding: 10,
        fontSize: 30,
      },
      buttontext: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#ffffff",
      },
      button: {
        alignItems: "center",
        backgroundColor: "#000000",
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
  });
  
  export default Send;