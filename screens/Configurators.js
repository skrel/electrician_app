import React, { useState, useEffect, ScrollView } from "react";
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
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const Configurators = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={[styles.screenTitle]}>Configurators</Text>
        {/* Box Configurator */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BoxConfigurator")}
        >
          <Text style={[styles.buttontext]}> Box Configurator </Text>
        </TouchableOpacity>

        {/* Panel Configurator */}
        <TouchableOpacity
          style={styles.buttonDisabled}
          onPress={() => Alert.alert(
            "Register your company",
            "Your company is not registered in the system. Reach out to us via appforconstruction@gmail.com",
            [
              {
                text: "Ok",
                onPress: () => console.log('Ok Pressed'),
              }
            ],
          )
        }
        >
          <Text style={[styles.buttontext]}> Panel Configurator </Text>
        </TouchableOpacity>

        {/* Light Configurator */}
        <TouchableOpacity
          style={styles.buttonDisabled}
          onPress={() => 
            Alert.alert(
              "Register your company",
              "Your company is not registered in the system. Reach out to us via appforconstruction@gmail.com",
              [
                {
                  text: "Ok",
                  onPress: () => console.log('Ok Pressed'),
                }
              ],
            )
          }
        >
          <Text style={[styles.buttontext]}> Light Configurator </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#ffffff",
  },
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    flex: 1,
    height: 40,
    margin: 16,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000000",
    //flex: 1,
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
  buttonDisabled: {
    alignItems: "center",
    backgroundColor: "#9c9c9c",
    //flex: 1,
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
  itemcard: {
    backgroundColor: "#e6e6e6",
    flex: 1,
    margin: 16,
    padding: 10,
    borderRadius: 20,
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 20,
  },
  normaltext: {
    fontSize: 14,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#f7f7f7",
  },
  textSmall: {
    //fontWeight: "bold",
    fontSize: 8,
    textAlign: "right",
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default Configurators;
