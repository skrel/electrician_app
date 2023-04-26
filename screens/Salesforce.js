import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking
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

const Salesforce = ({ navigation }) => {

    // custom code here
    const [code, setCode] = useState("");

    let url = 'https://login.salesforce.com/services/oauth2/token?';
    let client_id = '3MVG9Nk1FpUrSQHfqI0D15n2kX94zxFPYbLjP4ymITStd987ymiHR76JxxGq.2t9onJsKm6RiueJFAMVgi7Lf';
    let redirect_uri = 'https://skrel.github.io/sf_auth_success';
    let client_secret = '0A565894322F18F5357B247C513EB64C27754C5500A6E5C6219BF2EB613DF8AD';
    let grant_type = 'authorization_code';
    // let code = 'aPrxQMYPimtcuJ71iTrvhqRrpMvOD.A_gEOXA4NjkurNJqBIWps1HUyGrv_jGWBmD7.arqEh2g==';

    var myUrl = url + 'client_id=' 
    + client_id + '&redirect_uri=' 
    + redirect_uri + '&client_secret=' 
    + client_secret + '&grant_type=' 
    + grant_type + '&code=' + code;

    // get access token
    const getToken = () => {
        fetch(myUrl, {method: "POST"})
            .then((response) => response.json())
            .then((responseData) => {
                console.log('@@@ responseData = ' + JSON.stringify(responseData));
            })
    }

    // post
    const postSF = () => {
        console.log('post start')
        return fetch('https://login.salesforce.com/services/data/v51.0/sobjects/Account', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer 00D5Y000001NBHY!AQQAQIHxXuU4EjMVQ4AFIjH7ufn3GCITvyMVRk_urK6u8h9K0nMZjMnw7ZLtLSNsNDlUt3dYa0qCtXHbuyWibwtFt7GRLEyI',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: 'From App 20230426',
                BillingState: 'AZ',
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('@@@ response after post = ' + JSON.stringify(responseData));
            })
    }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={[styles.screenTitle]}>Salesforce</Text>
            <TouchableOpacity style={styles.buttonDeck} onPress={() => {
                Linking.openURL(
                    "https://login.salesforce.com/services/oauth2/authorize?client_id=3MVG9Nk1FpUrSQHfqI0D15n2kX94zxFPYbLjP4ymITStd987ymiHR76JxxGq.2t9onJsKm6RiueJFAMVgi7Lf&redirect_uri=https://skrel.github.io/sf_auth_success&response_type=code"
                    )
            }}>
                <Text style={[styles.buttontext]}> Authorize </Text>
            </TouchableOpacity>
            <TextInput style={styles.input} underlineColorAndroid="transparent" placeholder="Paste code here" onChangeText={(text) => setCode(text)} value={code}/>
            <TouchableOpacity style={styles.buttonDeck} onPress={() => {console.log(myUrl), getToken()}}>
                <Text style={[styles.buttontext]}> Get Token </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDeck} onPress={() => {postSF()}}>
                <Text style={[styles.buttontext]}> Create Account </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30
  },
  buttonDeck: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    height: 42,
    margin: 0,
    padding: 3,
    borderRadius: 10,
  },
  buttontext: {
    //fontWeight: "bold",
    color: "#000000",
  },
  input: {
    height: 40,
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
});

export default Salesforce;