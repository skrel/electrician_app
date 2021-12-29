import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

function Info() {
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
          <Text style={[styles.titletext]}>What is Electrician </Text>
          <Text>- Electrical assembly configurator</Text>
          <Text>- Electrical part order</Text>
          <Text> </Text>
          <Text style={[styles.titletext]}>
            If you use Electrician for business
          </Text>
          <Text>
            We'd like to offer you the Advanced version of Electrician and a company wide integration, including
          </Text>
          <Text>- Add or replace items with what you're using </Text>
          <Text>- Massive item update periodically </Text>
          <Text>- Data exchange with CRM system </Text>
          <Text>- Item locator with Google Maps </Text>
          <Text>- Item price calculation </Text>
          <Text>- Multi-user collaboration </Text>
          <Text>- Team performance charts </Text>
          <Text> </Text>
          <Text style={[styles.titletext]}>
            Advanced Electrician version preview
          </Text>
          <View style={styles.container}>
          <Image
            style={styles.picture}
            source={require("../assets/reactnativeapp.png")}
          />
           </View>     
           <Text> </Text>

           <Text style={[styles.titletext]}>
             Reach out to us 
            </Text>
            <Text>- Instagram #construction_automation </Text>
          <Text>- Email rufio3427@yahoo.com </Text>


        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 200,
    height: 420,
    borderColor: 'red',
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 20,
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
});

export default Info;
