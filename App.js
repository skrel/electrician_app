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
import ShopingCart from "./screens/shopingCart.js";
import shopingCartItem from "./screens/shopingCartItem.js";
import Box from "./screens/Box.js";
import Bracket from "./screens/Bracket.js";
import Profile from "./screens/Profile.js";
import Accessories from "./screens/Accessories.js";
import Device from "./screens/Device.js";
import addMyOwnItem from "./screens/addMyOwnItem.js";
import Panel from "./screens/Panel.js";
import Wire from "./screens/Wire.js";
import Conduit from "./screens/Conduit.js";
import Connector from "./screens/Connector.js";
import ExtensionRing from "./screens/ExtensionRing.js";
import Assembly from "./screens/Assembly.js";
import Configurator from "./screens/Configurator.js";
import HomeScreen from "./screens/Home.js";
import SeeAll from "./screens/seeAll.js";
import FireAlarm from "./screens/fireAlarm.js";
import Other from "./screens/Other.js";
//import z_testScreen from "./screens/z_testScreen.js";

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
                onPress={() => navigation.navigate("Shoping Cart")}
              />
            ),
            headerLeft: () => (
              <Button
                title="Profile"
                onPress={() => navigation.navigate("Profile")}
              />
            ),
            title: "",
            headerShadowVisible: false,
            headerStyle: {
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
          component={shopingCartItem}
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
          component={addMyOwnItem}
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
          name="Configurator"
          component={Configurator}
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
