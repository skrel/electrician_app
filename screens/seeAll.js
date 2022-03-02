import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

function SeeAll() {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={[styles.screenTitle]}>See All</Text>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    screenTitle: {
        margin: 2,
        padding: 10,
        fontSize: 40,
        fontStyle: "italic",
        //textDecorationLine: 'underline',
      },
});

export default SeeAll;
