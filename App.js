// In App.js in a new project

import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";

//screens
import ShopingCart from "./screens/ShopingCart.js";
import ShopingCartItem from "./screens/ShopingCartItem.js";
import Box from "./screens/Box.js";
import Bracket from "./screens/Bracket.js";
import Profile from "./screens/Profile.js";
import Accessories from "./screens/Accessories.js";
import Device from "./screens/Device.js";
import AddMyOwnItem from "./screens/AddMyOwnItem.js";
import Panel from "./screens/Panel.js";
import Wire from "./screens/Wire.js";
import Conduit from "./screens/Conduit.js";
import Connector from "./screens/Connector.js";
import ExtensionRing from "./screens/ExtensionRing.js";
import Assembly from "./screens/Assembly.js";
import HomeScreen from "./screens/Home.js";
import SeeAll from "./screens/SeeAll.js";
import FireAlarm from "./screens/FireAlarm.js";
import Other from "./screens/Other.js";
import MyProfile from "./screens/MyProfile";
import Configurators from "./screens/Configurators";
import BoxConfigurator from "./screens/BoxConfigurator.js";
import PanelConfigurator from "./screens/PanelConfigurator";
import LightConfigurator from "./screens/LightConfigurator";
import Send from "./screens/Send.js";
import ListMyProject from "./screens/ListMyProject";
import DetailProject from "./screens/DetailProject";
import Register from "./screens/Register";

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

const Stack = createNativeStackNavigator();

function App() {
  //create a table
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cart (id integer primary key not null, image text, name text, purpose text, qty text);"
      );
      tx.executeSql('ALTER TABLE cart ADD COLUMN price text', []); // add new column to my sqlite
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Cart"
                //color='#000000'
                onPress={() => navigation.navigate("Shoping Cart")}
              />
            ),
            headerLeft: () => (
              <Button
                title="Profile"
                //color='#000000'
                onPress={() => navigation.navigate("Profile")}
              />
            ),
            title: "",
            headerShadowVisible: false,
            //headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#d9d327',
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Shoping Cart"
          component={ShopingCart}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Shopping Cart Item"
          component={ShopingCartItem}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Box"
          component={Box}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Bracket"
          component={Bracket}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Accessories"
          component={Accessories}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Device"
          component={Device}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Add My Own Item"
          component={AddMyOwnItem}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Panel"
          component={Panel}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Wire"
          component={Wire}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Conduit"
          component={Conduit}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Connector"
          component={Connector}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Extension Ring"
          component={ExtensionRing}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Assembly"
          component={Assembly}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="BoxConfigurator"
          component={BoxConfigurator}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="See All"
          component={SeeAll}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="Fire Alarm"
          component={FireAlarm}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="Other"
          component={Other}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="myProfile"
          component={MyProfile}
          options={{
            title: "",
            headerBackVisible: false,
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="Configurators"
          component={Configurators}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="PanelConfigurator"
          component={PanelConfigurator}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="LightConfigurator"
          component={LightConfigurator}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="Send"
          component={Send}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="ListMyProject"
          component={ListMyProject}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="DetailProject"
          component={DetailProject}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "",
            //headerBackVisible: false,
            headerShadowVisible: false,
            headerStyle: {
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        />

        {/* <Stack.Screen
          name="Testing"
          component={Testing}
          options={{
            title: "",
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#2a57fa',
              borderBottomColor: "transparent",
              shadowColor: "transparent",
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 14,
  },
  buttontextwhite: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    height: 80,
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
  titletext: {
    fontWeight: "bold",
    fontSize: 20,
  },
  normaltext: {
    fontSize: 14,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
  invisibleButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    height: 80,
    margin: 16,
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
