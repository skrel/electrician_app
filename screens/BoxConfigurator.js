import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Svg, { Rect, Polygon, Circle } from "react-native-svg";
import * as SQLite from "expo-sqlite";
import { ASSEMBLY_TYPE_LOCAL, DEFAULT_QTY } from '../components/Constants.js'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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

//scroll horizontal
//TODO: add pictures
const AssemblyType = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={{flexDirection:"row"}}>
    <Image
      style={{ width: 15, height: 15 }}
      source={{ uri: item.img }}
    />
    <Text style={[styles.title, textColor]}> {item.title}</Text>
    </View>
  </TouchableOpacity>
);

//TODO: add scrol views for others

const BoxConfigurator = ({ navigation }) => {
  const [forceUpdate] = useForceUpdate();
  //const itemImage = "https://skrel.github.io/jsonapi/image/na.png";
  const [itemName, setItemName] = useState("Assembly Name");
  const [selectedAssemblyTypeId, setSelectedAssemblyTypeId] = useState(null);
  const [assemblyTypeDescription, setAssemblyTypeDescription] = useState("custom");
  const [image, setImage] = useState("https://skrel.github.io/jsonapi/image/na.png");
  let DEFAULT_PRICE = '0.01';

  //this is what horizontal flatlist returns
  const renderHorizontalListItem = ({ item }) => {
    const backgroundColor = item.id === selectedAssemblyTypeId ? "#000000" : "#ffffff";
    const color = item.id === selectedAssemblyTypeId ? 'white' : 'black';

    return (
      <AssemblyType
        item={item}
        onPress={() => {setSelectedAssemblyTypeId(item.id), setAssemblyTypeDescription(item.title), setImage(item.img)}}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  //counter
  const [counter, setCounter] = useState(0);
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  //add stuff
  const [boxIsEnabled, setBoxIsEnabled] = useState(false);
  const [boxDescription, setBoxDescription] = useState("");

  const [bracketIsEnabled, setBracketIsEnabled] = useState(false);
  const [bracketDescription, setBracketDescription] = useState("");

  const [groundIsEnabled, setGroundIsEnabled] = useState(false);
  const [groundDescription, setGroundDescription] = useState(false);

  const [mudringIsEnabled, setMudringIsEnabled] = useState(false);
  const [mudringDescription, setMudringDescription] = useState("");

  const [extensionringIsEnabled, setExtensionringIsEnabled] = useState(false);
  const [extensionringDescription, setExtensionringDescription] = useState("");

  const [coverplateIsEnabled, setCoverplateIsEnabled] = useState(false);
  const [coverplateDescription, setCoverplateDescription] = useState(false);

  const [deviceIsEnabled, setDeviceIsEnabled] = useState(false);
  const [deviceDescription, setDeviceDescription] = useState("");

  const [tlkoIsEnabled, setTlkoIsEnabled] = useState(false);
  const [tlkoDescription, setTlkoDescription] = useState("");

  const [tckoIsEnabled, setTckoIsEnabled] = useState(false);
  const [tckoDescription, setTckoDescription] = useState("");

  const [trkoIsEnabled, setTrkoIsEnabled] = useState(false);
  const [trkoDescription, setTrkoDescription] = useState("");

  const [firePadIsEnabled, setFirePadIsEnabled] = useState(false);
  const [firePadDescription, setFirePadDescription] = useState(false);

  const [whipIsEnabled, setWhipIsEnabled] = useState(false);
  const [whipDescription, setWhipDescription] = useState(false);

  const itemDescription =  "assembly type: " +  assemblyTypeDescription +  ", box: " +  boxDescription +  ", bracket: " +  bracketDescription +  ", ground: " +
  groundDescription +  ", mudring: " +  mudringDescription +  ", fire pad: " +  firePadDescription +  ", extension ring: " +  extensionringDescription +
  ", cover plate: " +  coverplateDescription +  ", device: " +  deviceDescription +  ", top lko: " +  tlkoDescription +  ", top cko: " +  tckoDescription +
  ", top rko:" +  trkoDescription + ", whip: " + whipDescription;

  const add = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into cart (image, name, purpose, qty, price) values (?, ?, ?, ?, ?)",
          [image, itemName, itemDescription, DEFAULT_QTY, DEFAULT_PRICE]
        );
        tx.executeSql("select * from cart", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  const Erase = () => {
    Alert.alert(
      "Are you sure?",
      "Do you want to erase your progress?",
      [
        {
          text: "Ok",
          onPress: () => navigation.navigate("Home"),
        },
        {
          text: "Cancel",
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>Box Configurator</Text>
      <Text style={[styles.textSmall]}>{counter} items added</Text>
      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView>
          {/* assembly name view */}
          <View style={styles.flexRow}>
            <Text style={{ paddingLeft: 10, fontSize: 20 }}>Name:</Text>
            <TextInput style={styles.inputName} defaultValue="Assembly Name" onChangeText={(text) => setItemName(text)} value={itemName} maxLength={18}/>
          </View>

          {/* assembly type view */}
          <View style={styles.flexRow}>
            {/* <Text style={{ paddingLeft: 20, fontSize: 14 }}>Assembly Type</Text> */}
            <FlatList
              horizontal={true}
              data={ASSEMBLY_TYPE_LOCAL}
              renderItem={renderHorizontalListItem}
              keyExtractor={(item) => item.id}
              extraData={selectedAssemblyTypeId}
            />
          </View>

          {/* box view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setBoxIsEnabled(!boxIsEnabled)}>
              <Text style={[styles.buttontext]}> { boxIsEnabled ? "Box Info" : "Box?"} </Text>
            </TouchableOpacity>
            {boxIsEnabled ? (<TextInput style={styles.input} placeholder="Type Box name here" onChangeText={(text) => setBoxDescription(text)} value={boxDescription} maxLength={18}/>) : null}
          </View>

          {/* bracket view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setBracketIsEnabled(!bracketIsEnabled)}>
              <Text style={[styles.buttontext]}> { bracketIsEnabled ? "Bracket Info" : "Bracket?"} </Text>
            </TouchableOpacity>
            {bracketIsEnabled ? (<TextInput style={styles.input} placeholder="Type Bracket name here" onChangeText={(text) => setBracketDescription(text)} value={bracketDescription} maxLength={18}/>) : null}
          </View>

          {/* ground view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => {setGroundIsEnabled(!groundIsEnabled), setGroundDescription(!groundDescription)}}>
              <Text style={[styles.buttontext]}> { groundIsEnabled ? "Ground Added" : "Ground?"} </Text>
            </TouchableOpacity>
          </View>

          {/* mudring view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setMudringIsEnabled(!mudringIsEnabled)}>
              <Text style={[styles.buttontext]}> { mudringIsEnabled ? "Mudring Info" : "Mudring?"} </Text>
            </TouchableOpacity>
            {mudringIsEnabled ? (<TextInput style={styles.input} placeholder="Type Mudring name here" onChangeText={(text) => setMudringDescription(text)} value={mudringDescription} maxLength={18}/>) : null}
          </View>

            {/* fire pad view */}
            <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => {setFirePadIsEnabled(!firePadIsEnabled), setFirePadDescription(!firePadDescription)}}>
              <Text style={[styles.buttontext]}> { firePadIsEnabled ? "Fire Pad Added" : "Fire Pad?"} </Text>
            </TouchableOpacity>
          </View>

          {/* ext ring view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setExtensionringIsEnabled(!extensionringIsEnabled)}>
              <Text style={[styles.buttontext]}> { extensionringIsEnabled ? "Extension Info" : "Extension?"} </Text>
            </TouchableOpacity>
            {extensionringIsEnabled ? (<TextInput style={styles.input} placeholder="Type Extension ring name here" onChangeText={(text) => setExtensionringDescription(text)} value={extensionringDescription} maxLength={18}/>) : null}
          </View>

          {/* cover plate view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => {setCoverplateIsEnabled(!coverplateIsEnabled), setCoverplateDescription(!coverplateDescription)}}>
              <Text style={[styles.buttontext]}> { coverplateIsEnabled ? "Cover Added" : "Cover Plate?"} </Text>
            </TouchableOpacity>
          </View>

          {/* device view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setDeviceIsEnabled(!deviceIsEnabled)}>
              <Text style={[styles.buttontext]}> { deviceIsEnabled ? "Device Info" : "Device?"} </Text>
            </TouchableOpacity>
            {deviceIsEnabled ? (<TextInput style={styles.input} placeholder="Type Device name here" onChangeText={(text) => setDeviceDescription(text)} value={deviceDescription} maxLength={18}/>) : null}
          </View>

          {/* lko view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setTlkoIsEnabled(!tlkoIsEnabled)}>
              <Text style={[styles.buttontext]}> { tlkoIsEnabled ? "LKO Info" : "LKO?"} </Text>
            </TouchableOpacity>
            {tlkoIsEnabled ? (<TextInput style={styles.input} placeholder="Type LKO name here" onChangeText={(text) => setTlkoDescription(text)} value={tlkoDescription} maxLength={18}/>) : null}
          </View>

          {/* cko view */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setTckoIsEnabled(!tckoIsEnabled)}>
              <Text style={[styles.buttontext]}> { tckoIsEnabled ? "CKO Info" : "CKO?"} </Text>
            </TouchableOpacity>
            {tckoIsEnabled ? (<TextInput style={styles.input} placeholder="Type CKO name here" onChangeText={(text) => setTckoDescription(text)} value={tckoDescription} maxLength={18}/>) : null}
          </View>

          {/* rko View */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setTrkoIsEnabled(!trkoIsEnabled)}>
              <Text style={[styles.buttontext]}> { trkoIsEnabled ? "RKO Info" : "RKO?"} </Text>
            </TouchableOpacity>
            {trkoIsEnabled ? (<TextInput style={styles.input} placeholder="Type RKO name here" onChangeText={(text) => setTrkoDescription(text)} value={trkoDescription} maxLength={18}/>) : null}
          </View>

          {/* whip View */}
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.buttonForConfig} onPress={() => setWhipIsEnabled(!whipIsEnabled)}>
              <Text style={[styles.buttontext]}> { whipIsEnabled ? "Whip Info" : "Whip?"} </Text>
            </TouchableOpacity>
            {whipIsEnabled ? (<TextInput style={styles.input} placeholder="Type Whip name here" onChangeText={(text) => setWhipDescription(text)} value={whipDescription} maxLength={32}/>) : null}
          </View>

          
          <View style={styles.flexRow}>
            
            <TouchableOpacity style={styles.buttonDeck} onPress={() => {add(), handleClick1()}}>
              <Ionicons name="add" size={24} color="black" />
              <Text style={[styles.deckbuttontext]}> Add Item </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDeck} onPress={() => Erase()}>
              <FontAwesome name="eraser" size={24} color="black" />
              <Text style={[styles.deckbuttontext]}> Erase </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>

      {/* svg portion, move to a different tab */}
      <View style={{ flex: 1, padding: 10 }}>
        <Svg height="100%" width="100%">
          {boxIsEnabled ? [<Image key="box" source={require("../assets/box.png")} style={styles.imgBox}/>] : null}
          {bracketIsEnabled ? [<Rect key="bracket"x="10"y="170"width="330"height="12"fill="#949494"/>] : null}
          {groundIsEnabled ? [ <Circle key="groundCircle"cx="101"cy="80"r="4"fill="green"/>,
                              <Rect key="groundLine"x="100"y="80"width="2"height="80"fill="green"/>]: null}
          {mudringIsEnabled ? [<Image key="firePad" source={require("../assets/mudring.png")} style={styles.imgMudring}/>] : null}
          {firePadIsEnabled ? [<Image key="firePad" source={require("../assets/fire_pad.png")} style={styles.imgFire}/>] : null}
          {extensionringIsEnabled ? [<Rect key="extringRect"x="110"y="110"width="130"height="130"stroke="#0019fc"strokeWidth="2.5"stroke-dasharray="5 20"/>] : null}
          {coverplateIsEnabled ? [<Rect key="coverRect"x="120"y="120"width="110"height="110"stroke="#fc0022"strokeWidth="2.5"stroke-dasharray="5 20"/>] : null}
          {deviceIsEnabled ? [<Image key="firePad" source={require("../assets/device.png")} style={styles.imgDevice}/>] : null}
          {tlkoIsEnabled ? [<Polygon key="tlkoPoly"points="130,70 140,100 150,70"strokeWidth="2.5"fill="#ffaa00"/>]: null}
          {tckoIsEnabled ? [<Polygon key="tckoPoly"points="165,70 175,100 185,70"strokeWidth="2.5"fill="#ffaa00"/>]: null}
          {trkoIsEnabled ? [<Polygon key="trkoPoly"points="200,70 210,100 220,70"strokeWidth="2.5"fill="#ffaa00"/>]: null}
        </Svg>
      </View>
    </SafeAreaView>
  );
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    padding: 3,
  },
  imgBox: {
    height: 100,
    width: 100,
    top: 125,
    left: 125,
    position: 'absolute'
  },
  imgFire: {
    height: 30,
    width: 30,
    top: 100,
    left: 240,
    position: 'absolute'
  },
  imgMudring: {
    height: 100,
    width: 100,
    top: 125,
    left: 125,
    position: 'absolute'
  },
  imgDevice: {
    height: 80,
    width: 30,
    top: 135,
    left: 160,
    position: 'absolute'
  },
  buttonDeck: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    height: 42,
    margin: 16,
    padding: 10,
    borderRadius: 10,
  },
  titletext: {
    fontWeight: "bold",
    fontSize: 16,
  },
  normaltext: {
    fontSize: 14,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  textSmall: {
    //fontWeight: "bold",
    fontSize: 8,
    textAlign: "right",
    paddingRight: 10,
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 2,
    color: "#ffffff",
  },
  deckbuttontext: {
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 2,
    color: "#000000",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#438a48",
    flex: 1,
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
  toggleSwitchContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    height: 25,
    marginLeft: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderBottomColor: "black",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    alignSelf: "stretch",
    //fontSize: 25,
  },
  inputHidden: {
    width: 0,
    height: 0,
  },
  buttonForConfig: {
    alignItems: "center",
    backgroundColor: "#dba400",
    //flex: 0.2,
    height: 30,
    width: 100,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 4,
    marginLeft: 20,
    padding: 6,
    borderRadius: 10,
  },
  inputName: {
    height: 25,
    marginLeft: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderBottomColor: "black",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    alignSelf: "stretch",
    fontSize: 20,
    fontStyle: 'italic'
  },
  item: {
    padding: 4,
    marginVertical: 5,
    marginHorizontal: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 10,
  },
});

export default BoxConfigurator;
