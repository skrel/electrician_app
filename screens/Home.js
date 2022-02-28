import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  Button,
  Linking,
} from "react-native";

//expo icons
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={[styles.screenTitle]}>Home</Text>
        <Text style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 14 }}>
          Parts
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
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
            <MaterialCommunityIcons
              name="code-brackets"
              size={24}
              color="black"
            />
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
            style={styles.invisibleButton}
            //onPress={() => navigation.navigate("Assembly")}
          ></TouchableOpacity>
        </View>

        <Text style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 14 }}>
          Assemblies
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />

        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Assembly")}
          >
            <Feather name="inbox" size={24} color="black" />
            <Text style={[styles.buttontext]}> Assembly </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Configurator")}
          >
            <MaterialIcons name="build" size={24} color="black" />
            <Text style={[styles.buttontext]}> Configurator </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.invisibleButton}
            //onPress={() => navigation.navigate("z_testScreen")}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.invisibleButton}
            //onPress={() => navigation.navigate("Assembly")}
          ></TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
          <Text
            style={{ textAlign: "center", color: "blue" }}
            onPress={() =>
              Linking.openURL("https://github.com/skrel/Electrician/wiki")
            }
          >
            Click here for more info
          </Text>
          <Text style={{ textAlign: "center" }}>
            Reach out via appforconstruction@gmail.com
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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

export default HomeScreen;
