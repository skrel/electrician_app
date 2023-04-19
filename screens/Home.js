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

import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 0 }}>
      <ScrollView style={{ flex: 1 }}>

      <View style={styles.header}>
        <TouchableOpacity >
          {/* <Text style={[styles.colorText]}> Home </Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
          <TouchableOpacity style={styles.buttonOne} onPress={() => navigation.navigate("Box")}>
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
          <TouchableOpacity style={styles.buttonTwo} onPress={() => navigation.navigate("Bracket")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Wire")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Panel")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Conduit")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Connector")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Extension Ring")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Device")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Fire Alarm")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Accessories")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Configurators")}>
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
          <TouchableOpacity style={styles.buttonRest} onPress={() => navigation.navigate("Other")}>
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
          {/* <TouchableOpacity style={styles.buttonRest}>
          </TouchableOpacity> */}
      </View>

      </ScrollView>
      

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={{width: '50%', marginTop: 5}}>
            <AntDesign name="home" size={22} color="blue" />
            <Text style={{fontSize: 10, color: "blue"}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 5}} onPress={() =>
            Linking.openURL(
              "https://www.linkedin.com/company/app-for-electrician/?viewAsMember=true"
            )
          }>
          <AntDesign name="infocirlceo" size={22} color="black" />
          <Text style={{fontSize: 10, color: "black"}}>Info</Text>
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
    backgroundColor: "#f2f2f2",
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: -15,
    marginBottom: 0,
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

  header: {
    flexDirection: "row",
    // backgroundColor: "#004aad",
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
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
    color: '#ffffff',
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
