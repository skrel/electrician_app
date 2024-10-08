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
  Linking,
  Alert,
  FlatList,
  Modal,
  Dimensions
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
    const [instanceUrl, setInstanceUrl] = useState("<undefined>");
    const [tokenType, setTokenType] = useState("");
    const [accounts, setAccounts] = useState([]);

    let [totalAccounts, setTotalAccounts] = useState();

    const [modalVisible, setModalVisible] = useState(false);
    const [opportunityName, setOpportunityName] = useState('');
    const [data, setData] = useState('');
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');
    let successPost;

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

    //erase
    const erase = () => {
        setCode();
    }

    // get access token
    const getToken = () => {
        console.log(myUrl)
        fetch(myUrl, {method: "POST"})
            .then((response) => response.json())
            .then((responseData) => {
                console.log('@@@ access token = ' + JSON.stringify(responseData.access_token)),
                console.log('@@@ access instance url = ' + JSON.stringify(responseData.instance_url)),
                console.log('@@@ access token type = ' + JSON.stringify(responseData.token_type)),
                setInstanceUrl(JSON.stringify(responseData.instance_url)),
                setToken(JSON.stringify(responseData.access_token)),
                setTokenType(JSON.stringify(responseData.token_type)),
                console.log('step 2 end ============================================')
            })
    }

    // get all accounts
    const getAccts = () => {
        console.log('step 3 start, get account pressed ============================================');
        fetch(instanceUrl.slice(1,-1) + '/services/data/v51.0/queryAll/?q=SELECT+id+,+name+from+Account', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token.slice(1, -1),
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('@@@ All my accounts = ' + JSON.stringify(responseData)),
                console.log('@@@  = ' + responseData.totalSize),
                // console.log('@@@  = ' + JSON.stringify(responseData.records)),
                setTotalAccounts(responseData.totalSize),
                setAccounts(responseData.records)
            })
    }



      // create opportunity
      const postOpps = (accountId, opportunityName, data) => {
        console.log('post opps clicked');
        fetch(instanceUrl.slice(1,-1) + '/services/data/v51.0/sobjects/Opportunity', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token.slice(1, -1),
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name: opportunityName,
                StageName: 'Prospecting',
                CloseDate: '2023-01-01',
                State__c: 'AZ',
                AccountId: accountId,
                Description: data
            }),
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('@@@ post response = ' + JSON.stringify(responseData));
            if(responseData.success === true) {
                Alert.alert(
                    "Success",
                    "It's been posted to Salesforce",
                    [
                      {
                        text: "Ok",
                      },
                    ],
                    { cancelable: false }
                  );
            } else {
                Alert.alert(
                    "Error",
                    "Something went wrong. Ask your Salesforse Administrator. Error: " + {responseData},
                    [
                      {
                        text: "Ok",
                      },
                    ],
                    { cancelable: false }
                  );
            }
        })
    }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{height: 500}} >
        <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={[styles.screenTitle]}>Salesforce</Text>
            <Text style={{marginTop:10}}> Step 1 - Press "Salesforce Login". It will redirect you to login.salesforce.com.</Text>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => {
                Linking.openURL(
                    "https://login.salesforce.com/services/oauth2/authorize?client_id=3MVG9Nk1FpUrSQHfqI0D15n2kX94zxFPYbLjP4ymITStd987ymiHR76JxxGq.2t9onJsKm6RiueJFAMVgi7Lf&redirect_uri=https://skrel.github.io/sf_auth_success&response_type=code"
                    )
            }}>
                <Text style={[styles.buttontext]}> Salesforce Login </Text>
            </TouchableOpacity>

            <Text style={{marginTop:10}}> Step 2 - To get access to your Salesforce, paste the access code you copied on the last screen and press "Get Access". Press Erase to empty the field.</Text>
            <TextInput 
                style={styles.input} 
                underlineColorAndroid="transparent" 
                placeholder="Paste code here" 
                onChangeText={(text) => setCode(text.slice(46))} 
                secureTextEntry={true}
                value={code}
            />
            
            <View style={{ flexDirection: "row", padding: 10 }}>
                <TouchableOpacity style={styles.buttonAccess} onPress={() => {console.log('step 2 start ============================================'), console.log('@@@ here is myUrl = ' + myUrl), getToken()}}>
                    <Text style={[styles.buttontext]}> Get Access </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonErase} onPress={() => {erase()}}>
                    <Text style={[styles.buttontext]}> Erase </Text>
                </TouchableOpacity>
            </View>

            <Text style={{marginTop:10}}> You have access to your {instanceUrl} salesforce org.</Text>
            <TouchableOpacity style={styles.buttonQuery} onPress={() => {getAccts()}}>
                <Text style={[styles.buttontext]}> See Accounts </Text>
            </TouchableOpacity>
            
        </View>
        </ScrollView>
        </View>

        <FlatList
            data={accounts}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => {setModalVisible(true), setAccountId(item.Id), setAccountName(item.Name)}}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <Text>{item.Name}</Text>
                        <Text style={[styles.accountId]}>Id: {item.Id}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        />



        <Modal animationType="fade"
          transparent={true}
          visible={modalVisible}
          presentationStyle="overFullScreen"
          >
          <View style={styles.popupView}>
            <View style={styles.modalContentView}>
                <Text style={[styles.titlePopuptext]}>Creating new opportunity for account name: {accountName}</Text> 
              <TextInput style={styles.inputView} placeholder="Enter Opportunity Name" onChangeText={(text) => setOpportunityName(text)}/>
              <TextInput style={styles.inputView} placeholder="Enter Data" onChangeText={(text) => setData(text)}/>
              <View style={[styles.flexRow, styles.backgroundButtonModal]}>
                <TouchableOpacity style={styles.buttonView} onPress={() => setModalVisible(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonView} onPress={() => (setModalVisible(false), postOpps(accountId, opportunityName, data))}>
                  <Text>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
  flexRow: {
    flexDirection: "row",
  },
  backgroundButtonModal: {
    justifyContent: 'space-between',
  },
  modalContentView: {
    margin: 20,
    width: Dimensions.get('screen').width - 40,
    height: 230,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingTop: 20,
    // alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titlePopuptext: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black'
  },
  inputView: {
    height: 40,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#f7f7f7",
  },
  buttonView: {
    borderWidth: 1,
    width: 80,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: 'black'
  },
  accountId: {
    fontSize: 9,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonLogin: {
    alignItems: "center",
    backgroundColor: "green",
    // flex: 1,
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
  buttonErase: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    height: 42,
    margin: 5,
    padding: 3,
    borderRadius: 10,
  },
  buttonQuery: {
    alignItems: "center",
    backgroundColor: "#de8d1d",
    // flex: 1,
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