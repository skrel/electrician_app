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
import Info from "./screens/Info.js";
import Accessories from "./screens/Accessories.js";
import Device from "./screens/Device.js";
import addMyOwnItem from "./screens/addMyOwnItem.js";
import Panel from "./screens/Panel.js";
import Wire from "./screens/Wire.js";
import Conduit from "./screens/Conduit.js";
import Connector from "./screens/Connector.js";
import ExtensionRing from "./screens/ExtensionRing.js";
import Assembly from "./screens/Assembly.js";

//expo icons
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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

function HomeScreen({ navigation }) {
  //create a table
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cart (id integer primary key not null, image text, name text, purpose text, qty text);"
      );
    });
  }, []);

  return (
    <ScrollView>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Wire")}
        >
          <MaterialCommunityIcons name="cable-data" size={24} color="black" />
          <Text style={[styles.buttontext]}> Wire </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Box")}
        >
          <Feather name="box" size={24} color="black" />
          <Text style={[styles.buttontext]}> Box </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Bracket")}
        >
          <MaterialCommunityIcons name="code-brackets" size={24} color="black" />
          <Text style={[styles.buttontext]}> Bracket </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Device")}
        >
          <MaterialIcons name="outlet" size={24} color="black" />
          <Text style={[styles.buttontext]}> Device </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Connector")}
        >
          <MaterialCommunityIcons name="power-plug" size={24} color="black" />
          <Text style={[styles.buttontext]}> Connector </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Extension Ring")}
        >
          <FontAwesome5 name="ring" size={24} color="black" />
          <Text style={[styles.buttontext]}> Extension Ring </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Conduit")}
        >
          <FontAwesome5 name="grip-lines" size={24} color="black" />
          <Text style={[styles.buttontext]}> Conduit </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Accessories")}
        >
          <Feather name="more-horizontal" size={24} color="black" />
          <Text style={[styles.buttontext]}> Accessories </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Panel")}
        >
          <FontAwesome5 name="solar-panel" size={24} color="black" />
          <Text style={[styles.buttontext]}> Panel </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Assembly")}
        >
          <Feather name="inbox" size={24} color="black" />
          <Text style={[styles.buttontext]}> Assembly </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={({navigation}) => ({
          headerRight: () => <Button title="Cart" onPress={() => navigation.navigate('Shoping Cart')} />,
          headerLeft: () => <Button title="Info" onPress={() => navigation.navigate('Info')} />,
        })}
          />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Shoping Cart" component={ShopingCart} />
        <Stack.Screen name="Shopping Cart Item" component={shopingCartItem} />
        <Stack.Screen name="Box" component={Box} />
        <Stack.Screen name="Bracket" component={Bracket} />
        <Stack.Screen name="Accessories" component={Accessories} />
        <Stack.Screen name="Device" component={Device} />
        <Stack.Screen name="Add My Own Item" component={addMyOwnItem} />
        <Stack.Screen name="Panel" component={Panel} />
        <Stack.Screen name="Wire" component={Wire} />
        <Stack.Screen name="Conduit" component={Conduit} />
        <Stack.Screen name="Connector" component={Connector} />
        <Stack.Screen name="Extension Ring" component={ExtensionRing} />
        <Stack.Screen name="Assembly" component={Assembly} />
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
    color: "white"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
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
});

export default App;
