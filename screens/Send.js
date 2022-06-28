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

//import * as Clipboard from 'expo-clipboard';

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
    const [copiedText, setCopiedText] = React.useState('');
    //const [textToSend, setTextToSend] = useState('');

    let rawText = JSON.stringify(cartContent);
    let textWithNoQuotes = rawText.replace(/"/g, "");
    let textStringWithNoComas = textWithNoQuotes.replace(/,/g, "\n");
    let textStringWithNoFrontCrlBrackets = textStringWithNoComas.replace(/{/g, "\n");
    let textStringWithNoBackCrlBrackets = textStringWithNoFrontCrlBrackets.replace(/}/g, "");
    let textStringWithNoFrontAndBackBrackets = textStringWithNoBackCrlBrackets.slice(1,-1);
    //let textStringWithNoSlashes = textStringWithNoFrontAndBackBrackets.replace("\\", "");

    // const copyToClipboard = async () => {
    //   await Clipboard.setStringAsync('some text');
    // };

    function MultilineTextInput(props) {
      return (
        <TextInput
        {...props}
        //editable = {false}
        showSoftInputOnFocus={false}/>
      )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
                    <Text style={[styles.screenTitle]}>Send</Text>
                          <MultilineTextInput
                            style={styles.input}
                            placeholder='Cart is empty'
                            multiline
                            //onChangeText={text => onChangeText(text)}
                            value={textStringWithNoFrontAndBackBrackets}
                          />
                </View>
            </TouchableWithoutFeedback>
            <Text style={[styles.textSmall]}>*Copy to Clipboard if you have issues with sending</Text>

            <View style={styles.flexRow}>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            sendEmail(
              "",
              "",
              "BOM from electrician-app -- \n \n" +
              textStringWithNoFrontAndBackBrackets,
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
        height: '80%',
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
      textSmall: {
        //fontWeight: "bold",
        fontSize: 8,
        textAlign: "center",
      },
  });
  
  export default Send;