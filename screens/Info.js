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
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={[styles.screenTitle]}>Info</Text>
        <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
          <Text style={[styles.titletext]}>What is Electrician </Text>
          <Text>- Electrical assembly configurator</Text>
          <Text>- Electrical part order</Text>
          <Text> </Text>
          <Text style={[styles.titletext]}>How Does Electrician Work </Text>
          <Text>
            Electrician app enables some basic mobile technology for
            electricians of all calibers.
          </Text>
          <Text> </Text>
          <Text style={[styles.titletext]}>Who Is Electrician For </Text>
          <Text>
            Electrician is designed to be used by individual electricians,
            electrical prefab shops, electrical contractors and sub-contractors.
          </Text>
          <Text> </Text>
          <Text style={[styles.titletext]}>
            If you use Electrician for business
          </Text>
          <Text>
            Even though Electrician app is not restricted or limited to users
            who are part of a single company or its partners, it can be
            customized for a specific client (electrical contractor,
            sub-contractor). There is a possibility to upload custom item
            listings for your need. This app can be integrated with a CRM system
            or CAD. We'd like to offer you the Advanced version of Electrician
            and a company wide integration, including
          </Text>
          <Text>- Add or replace items with what you're using </Text>
          <Text>- Massive item update periodically </Text>
          <Text>- Data exchange with CRM system </Text>
          <Text>- Item geolocator </Text>
          <Text>- Item price calculation </Text>
          <Text>- Multi-user collaboration </Text>
          <Text>- Progect tracking and reports </Text>
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

          <Text style={[styles.titletext]}>Reach out to us</Text>
          <Text>- Email appforelectrician@gmail.com </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 200,
    height: 420,
    borderColor: "red",
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
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 40,
    fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
});

export default Info;
