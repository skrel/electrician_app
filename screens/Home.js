import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  Alert,
  Linking,
} from "react-native";

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2a57fa", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#2a57fa" }}>
      <View style={styles.header}>
        <TouchableOpacity >
          <Text style={[styles.colorText]}> Home </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonOne}>
            <ImageBackground
              source={require("../assets/boxButton.png")}
              imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              style={{
                height: '100%',
                width: '100%',
                opacity: 0.7,              
              }}> 
              <Text style={[styles.buttontext]}>BOX</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTwo}>
            <ImageBackground
                source={require("../assets/bracketButton.png")}
                imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>BRACKET</Text>
              </ImageBackground>
          </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/wireButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>WIRE</Text>
              </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/panelButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>PANEL</Text>
              </ImageBackground>
          </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/conduitButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>CONDUIT</Text>
              </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/connectorButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>CONNECTOR</Text>
              </ImageBackground>
          </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/extensionButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>EXTENSION</Text>
              </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/deviceButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>DEVICE</Text>
              </ImageBackground>
          </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/fireAlarmButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>FIRE ALARM</Text>
              </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/accessoriesButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>ACCESSORIES</Text>
              </ImageBackground>
          </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Assembly")}>
          <ImageBackground
                source={require("../assets/assemblyButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>ASSEMBLIES</Text>
              </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/config.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>CONFIGURATOR</Text>
              </ImageBackground>
          </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonRest}>
          <ImageBackground
                source={require("../assets/otherButton.png")}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,              
                }}> 
                <Text style={[styles.buttontext]}>OTHER</Text>
              </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRest}>
          </TouchableOpacity>
      </View>

      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={() =>
            Linking.openURL(
              "https://www.linkedin.com/company/app-for-electrician/?viewAsMember=true"
            )
          }>
          <Text style={[styles.colorText]}> Info </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#2a57fa",
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: -15,
    height: '5%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  colorText: {
    color: 'yellow',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 24,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#2a57fa",
    alignContent: 'center',
    justifyContent: 'center',
    //marginTop: -15,
    height: 80,
  },
  buttonOne: {
    marginTop: -25,
    backgroundColor: 'black',
    width: '50%',
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  buttonTwo: {
    marginTop: -25,
    backgroundColor: 'black',
    width: '50%',
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  buttonRest: {
    //marginTop: -25,
    backgroundColor: 'black',
    width: '50%',
    height: 100,
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
});

export default HomeScreen;
