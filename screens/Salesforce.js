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
    const [token, setToken] = useState("");
    const [instanceUrl, setInstanceUrl] = useState("");
    const [tokenType, setTokenType] = useState("");

    const [access, setAccess] = useState(false);

    let url = 'https://login.salesforce.com/services/oauth2/token?';
    let client_id = '3MVG9Nk1FpUrSQHfqI0D15n2kX94zxFPYbLjP4ymITStd987ymiHR76JxxGq.2t9onJsKm6RiueJFAMVgi7Lf';
    let redirect_uri = 'https://skrel.github.io/sf_auth_success';
    let client_secret = '0A565894322F18F5357B247C513EB64C27754C5500A6E5C6219BF2EB613DF8AD';
    let grant_type = 'authorization_code';

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
                console.log('@@@ responseData = ' + JSON.stringify(responseData)),
                console.log('@@@ access token = ' + JSON.stringify(responseData.access_token)),
                console.log('@@@ access instance url = ' + JSON.stringify(responseData.instance_url)),
                console.log('@@@ access token type = ' + JSON.stringify(responseData.token_type)),
                setInstanceUrl(JSON.stringify(responseData.instance_url)),
                setToken(JSON.stringify(responseData.access_token)),
                setTokenType(JSON.stringify(responseData.token_type))
                // if(responseData.access_token !== null || responseData.access_token !== undefined) {
                //     setAccess(true);
                // }
            })
    }

    // post
    const postSF = () => {
        console.log('post start')
        return fetch(instanceUrl + '/services/data/v51.0/sobjects/Account', {
            method: 'POST',
            headers: {
                Authorization: tokenType + " " + token,
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


    // get all accounts
    const getAccts = () => {
        fetch(instanceUrl + '/services/data/v51/queryAll/?q=SELECT+name+from+Account', {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                console.log('@@@ All my accounts = ' + JSON.stringify(responseData))
            })
    }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={[styles.screenTitle]}>Salesforce</Text>
            <Text style={{marginTop:10}}> Step 1 - Press "Salesforce Login" and enter your credentials.</Text>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => {
                Linking.openURL(
                    "https://login.salesforce.com/services/oauth2/authorize?client_id=3MVG9Nk1FpUrSQHfqI0D15n2kX94zxFPYbLjP4ymITStd987ymiHR76JxxGq.2t9onJsKm6RiueJFAMVgi7Lf&redirect_uri=https://skrel.github.io/sf_auth_success&response_type=code"
                    )
            }}>
                <Text style={[styles.buttontext]}> Salesforce Login </Text>
            </TouchableOpacity>

            <Text style={{marginTop:10}}> Step 2 - To get access to your Salesforce entity, paste the access code you copied on the previouse screen and click "Get Access"</Text>
            <TextInput 
                style={styles.input} 
                underlineColorAndroid="transparent" 
                placeholder="Paste code here" 
                onChangeText={(text) => setCode(text)} 
                secureTextEntry={true}
                value={code}
            />
            
            <TouchableOpacity style={styles.buttonAccess} onPress={() => {console.log(myUrl), getToken()}}>
                <Text style={[styles.buttontext]}> Get Access </Text>
            </TouchableOpacity>

            {access ? [
                <Text style={{marginTop:10}}> You have access to your {instanceUrl} salesforce org.</Text>,
                <TouchableOpacity style={styles.buttonQuery} onPress={() => {getAccts()}}>
                    <Text style={[styles.buttontext]}> See Accounts </Text>
                </TouchableOpacity>
            ] : null}
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
  buttonLogin: {
    alignItems: "center",
    backgroundColor: "green",
    flex: 1,
    height: 42,
    margin: 5,
    padding: 3,
    borderRadius: 10,
  },
  buttonAccess: {
    alignItems: "center",
    backgroundColor: "blue",
    flex: 1,
    height: 42,
    margin: 5,
    padding: 3,
    borderRadius: 10,
  },
  buttonQuery: {
    alignItems: "center",
    backgroundColor: "#de8d1d",
    flex: 1,
    height: 42,
    margin: 5,
    padding: 3,
    borderRadius: 10,
  },
  buttontext: {
    color: "#ffffff",
    marginTop: 10,
    fontWeight: "bold"
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