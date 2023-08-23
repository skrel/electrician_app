import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Modal
} from "react-native";
import * as SQLite from "expo-sqlite";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import database from "../firebase";
import screenRefrech from "./DetailProject"

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
}

const db = openDatabase();

// const { height } = Dimensions.get("window");

function ProjectItem({ route, navigation }) {
    const { itemId } = route.params;
    const { value } = route.params;
    const { image } = route.params;
    const { purpose } = route.params;
    const { qty } = route.params;
    const { price } = route.params;
    const { projectName } = route.params;
    const { projectId } = route.params;
    const { projItems } = route.params;

    const [forceUpdate] = useForceUpdate()
    const [text, setText] = React.useState(qty)
    const [priceValue, setPriceValue] = React.useState(price)
    const [modalVisible, setModalVisible] = useState(false)

    const deleteItem = async () => {

        let itemsLeft = []
        for (var i = 0; i < projItems.length; i++) {
            let object = projItems[i]

            if (object.iid != itemId) {
                let createItem = {
                    "image": object.image,
                    "name": object.name,
                    "price": object.price,
                    "purpose": object.purpose,
                    "qty": object.qty
                }
                itemsLeft.push(createItem)
            }
        }

        await database.collection("users").doc(projectId).update({
            projects: [...itemsLeft],
        });
    };

    const Dublicate = () => {
        Alert.alert(
            "Ups, something went wrong...",
            "Let us know if it happened",
            [
                {
                    text: "Ok",
                    //onPress: () => navigation.navigate("Home"),
                },
            ],
            { cancelable: false }
        );
    };








    const updateItemInFirebase = async () => {
        let pojectItems = []
        let itemsNoChange = []
        let updatedItem = []

        // get project items
        await database.collection('users')
            .doc(projectId)
            .get()
            .then(doc => {
                if (doc && doc.exists) {
                    let myData = doc.data()
                    // console.log(doc.id, '=>', myData)
                    // console.log('name = ', myData.name)
                    // console.log('items = ', myData.projects)
                    pojectItems = [...myData.projects]
                }
            })

            let itemArrNum = itemId - 1

            for (var i = 0; i < pojectItems.length; i++) {
                if (i != itemArrNum) {
                    console.log('no change')
                    itemsNoChange.push(pojectItems[i])
                } else {
                    console.log('change')
                    // pojectItems[i].name = itemName
                    pojectItems[i].price = priceValue
                    // pojectItems[i].purpose = itemPurpose
                    pojectItems[i].qty = text

                    updatedItem.push(pojectItems[i])
                }
            }

            console.log('updated -->')
            console.log(updatedItem)

            // console.log('not changing = '+ itemsNoChange)
            // console.log('changing = ' + updatedItem)

            let itemsToPush = [...itemsNoChange, ...updatedItem]
        

        // update item
        await database.collection('users').doc(projectId).update({
            projects: [...itemsToPush]
        })
        // .then()
        .then(
            Alert.alert(
                "Success",
                "Item has been updated. Please refresh.",
                [
                    {
                        text: "Ok",
                        //onPress: () => navigation.navigate("Home"),
                    },
                ],
                { cancelable: false }
            )
        )
           
    }









    let purposeString = JSON.stringify(purpose);
    let purposeToDisplay = purposeString.replace(/,/g, "\n");
    const editText = purposeToDisplay.replace(/"/g, "\n");

    // edit purpose with this
    // state here is the item purpose
    const [state, setState] = useState(editText); // new
    let onChange = (event) => {
        let newValue = event
        setState(newValue.replace(/\\n/g, '; '))
        // console.log('my state here = ', state)
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                <Text style={[styles.screenTitle]}> {projectName} Cart Item</Text>


                <View style={styles.itemcard}>

                    {/* QTY */}
                    {/* ================================= */}
                    <View style={styles.flexRow}>
                        <Text style={{ paddingLeft: 20, fontSize: 20 }}>Quantity:</Text>
                        <View style={{ flex: 1, paddingLeft: 20 }}>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                textAlign={"center"}
                                defaultValue={JSON.stringify(qty).replace(/"/g, "")}
                                onChangeText={(text) => setText(text)}
                                onSubmitEditing={() => {
                                    setText(text);
                                }}
                                maxLength={12}
                            />
                        </View>
                    </View>

                    {/* PRICE */}
                    {/* ================================= */}
                    <View style={styles.flexRow}>
                        <Text style={{ paddingLeft: 20, fontSize: 20 }}>Price, $:</Text>
                        <View style={{ flex: 1, paddingLeft: 20 }}>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                textAlign={"center"}
                                defaultValue={JSON.stringify(price).replace(/"/g, "")}
                                onChangeText={(text) => setPriceValue(text)}
                                onSubmitEditing={() => {
                                    setPriceValue(priceValue);
                                }}
                                maxLength={12}
                            />
                        </View>
                    </View>

                    {/* ITEM DATA */}
                    {/* ================================= */}
                    <Text style={{ paddingLeft: 20, fontSize: 20, paddingBottom: 20 }}>
                        Item Name: {JSON.stringify(value)}{" "}
                    </Text>
                    <Text style={styles.normaltext}>
                        Description {editText}
                    </Text>
                </View>

                {/* ITEM IMAGE */}
                {/* ================================= */}
                <View style={styles.container}>
                    <Image style={{ width: 250, height: 250 }} source={{ uri: image }} />
                </View>
            </ScrollView>

            {/* BUTTON DECK */}
            {/* ================================= */}
            <View style={styles.flexRow}>
                <TouchableOpacity style={styles.buttonDeck} onPress={() => {
                    deleteItem();
                        Alert.alert(
                            "Success",
                            "Item has been deleted",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => navigation.navigate("Home"),
                                },
                            ],
                            { cancelable: false }
                        )
                }}>
                    <AntDesign name="delete" size={24} color="black" />
                    <Text style={[styles.buttontext]}> Delete </Text>
                </TouchableOpacity>



{/* update item */}
                <TouchableOpacity
                    style={styles.buttonDeck}
                    onPress={() => {
                        updateItemInFirebase()
                        // Alert.alert(
                        //     "Ups, something went wrong...",
                        //     "Let us know if it happened",
                        //     [
                        //         {
                        //             text: "Ok",
                        //             //onPress: () => navigation.navigate("Home"),
                        //         },
                        //     ],
                        //     { cancelable: false }
                        // );
                    }}
                >
                    <MaterialCommunityIcons name="update" size={24} color="black" />
                    <Text style={[styles.buttontext]}> Update </Text>
                </TouchableOpacity>

{/* update item */}



                <TouchableOpacity style={styles.buttonDeck} onPress={Dublicate}>
                    <Ionicons name="duplicate-outline" size={24} color="black" />
                    <Text style={[styles.buttontext]}> Duplicate </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDeck} onPress={() => setModalVisible(true)}>
                    <AntDesign name="edit" size={24} color="black" />
                    <Text style={[styles.buttontext]}> Edit </Text>
                </TouchableOpacity>
            </View>

            {/* MODAL */}
            {/* ================================= */}
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                presentationStyle="overFullScreen"
            >
                <View style={styles.popupView}>
                    <View style={styles.modalContentView}>
                        <Text style={[styles.titlePopuptext]}>Edit Item</Text>
                        <TextInput
                            multiline
                            style={styles.inputView}
                            onChangeText={onChange} // setNewDescription
                            value={state} // newDescription
                        />
                        <View style={[styles.flexRow, styles.backgroundButtonModal]}>
                            <TouchableOpacity style={styles.buttonView} onPress={() => setModalVisible(false)}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonView} onPress={() => {
                                    setModalVisible(false),
                                    Alert.alert(
                                        "Ups, something went wrong...",
                                        "Let us know if it happened",
                                        [
                                            {
                                                text: "Ok",
                                                //onPress: () => navigation.navigate("Home"),
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                            }}>
                                <Text>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
    },
    popupView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    },
    modalContentView: {
        margin: 20,
        width: Dimensions.get('screen').width - 40,
        height: 230,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingTop: 40,
        // alignItems: "center",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titlePopuptext: {
        textAlign: 'center',
        fontSize: 14,
        color: 'black'
    },
    inputView: {
        height: 80,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#f7f7f7",
        borderRadius: 10,
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#f7f7f7",
    },
    backgroundButtonModal: {
        justifyContent: 'space-between',
    },
    buttonView: {
        borderWidth: 1,
        width: 80,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 10,
        borderColor: 'black'
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around",
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
        backgroundColor: "#e6e6e6",
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
    itemcard: {
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
    },
    input: {
        height: 25,
        margin: 0,
        marginBottom: 6,
        borderWidth: 1,
        borderBottomColor: "black",
        borderTopColor: "white",
        borderLeftColor: "white",
        borderRightColor: "white",
        alignSelf: "stretch",
        fontSize: 25,
    },
    screenTitle: {
        margin: 2,
        padding: 10,
        fontSize: 30,
        //fontStyle: "italic",
        //textDecorationLine: 'underline',
    },
    keyboardContainer: {
        flex: 1,
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
    buttontext: {
        //fontWeight: "bold",
        fontSize: 9,
        marginTop: 2,
        color: "#000000",
    },
});

export default ProjectItem;
