import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    SafeAreaView,
    Dimensions,
    Modal,
    TextInput,
    Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import database from "../firebase";
import { auth } from "../firebase";

export default function DetailProject({ route, navigation }) {
    const [items, setItems] = useState(route?.params?.projects); // route?.params?.projects
    const [modalVisible, setModalVisible] = useState(false);
    const [projName, setProjName] = useState(route?.params?.name)

    // try useEffect here
    // useEffect(() => {
    //     DeviceEventEmitter.emit("reloadItems");
    //     setItems([]);
    //   }, [])


    // try useEffect here


    // refresh button
    const handleRefresh = async () => {
        console.log('pressed')
        let response = []
        let prjItemList = []
        await database.collection('users').where('userId', '==', auth.currentUser.uid ).get().then( async(snapshot) => {
            // let data = snapshot.data();
            
            snapshot
              .forEach(documentSnapshot => {
                item = {...documentSnapshot.data(), id: documentSnapshot.id};
                response.push(item)
              });
            // setListProject(response)
            // console.log('project name --->')
            // console.log(response.body.name)
          })

          console.log('response.length =',response.length)
          for(var i = 0; i < response.length; i++) {
            
            if(response[i].name === projName) {
                // console.log('projName =',projName)
                // console.log('current projName =',response[i].name)
                // console.log('project items', response[i].projects)
                setItems(response[i].projects)
            }
          }
    }

    const handleDeleteItemsFromFirebase = async (item) => {
        await database.collection("users").doc(route?.params?.id).update({
            projects: [],
        });
        DeviceEventEmitter.emit("reloadItems");
        setItems([]);
    };

    // const handleRefreshProject = async (item) => {
    //     console.log('refresh pressed')
    //     Alert.alert(
    //         "Ups, something went wrong...",
    //         "Let us know if it happened",
    //         [
    //             {
    //                 text: "Ok",
    //                 //onPress: () => navigation.navigate("Home"),
    //             },
    //         ],
    //         { cancelable: false }
    //     );
    // };

    // build ids to my items
    let itemListWithIds = []
    for (var j = 0; j < items.length; j++) {
        var object = items[j]
        const prjItemWithId = {
            "iid": j + 1,
            "image": object.image,
            "name": object.name,
            "price": object.price,
            "purpose": object.purpose,
            "qty": object.qty
        }
        itemListWithIds.push(prjItemWithId)
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("ProjectItem", {
                    itemId: item.iid,
                    value: item.name,
                    image: item.image,
                    purpose: item.purpose,
                    qty: item.qty,
                    price: item.price,
                    projectName: route?.params?.name,
                    projectId: route?.params?.id,
                    projItems: itemListWithIds // passing all items
                })
            }
        >
            <View style={styles.itemView}>
                <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{ uri: item.image }}
                    />
                    <View style={{ flex: 1, padding: 10 }}>
                        <Text style={[styles.titletext]}>{item.name}</Text>
                        <Text numberOfLines={1}>{item.purpose}</Text>
                        <Text style={styles.innerText}>QTY: {item.qty}</Text>
                        <Text style={[styles.price]}>$ {item.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.titletext}>{route?.params?.name}</Text>

                    {/* Delete */}
                    <TouchableOpacity onPress={handleDeleteItemsFromFirebase}>
                        <FontAwesome name="trash" size={24} color="black" />
                    </TouchableOpacity>

                    {/* Refresh */}
                    <TouchableOpacity onPress={handleRefresh}>
                        <FontAwesome name="refresh" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                
                <FlatList
                    data={itemListWithIds} // items
                    renderItem={renderItem}
                    //   keyExtractor={({ id }) => id.toString()}
                    keyExtractor={({ id }) => id ? id.toString() : Math.random().toString(36).substr(2, 9)}
                />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                presentationStyle="overFullScreen"
            >
                <View style={styles.popupView}>
                    <View style={styles.modalContentView}>
                        <Text style={[styles.titletext]}>Create New Item</Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                maxLength={18}
                            />
                            <View style={[styles.flexRow, styles.backgroundButtonModal]}>
                                <TouchableOpacity
                                    style={styles.buttonView}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonView}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    flexRow: {
        flexDirection: "row",
    },
    backgroundButtonModal: {
        justifyContent: "space-between",
    },
    innerText: {
        color: "#0000ff",
        paddingTop: 5,
    },
    titletext: {
        fontWeight: "bold",
        fontSize: 16,
    },
    price: {
        backgroundColor: "#03a80e",
        color: "#ffffff",
        //width: 80,
        maxWidth: 80,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 9,
        fontWeight: "bold",
    },
    itemView: {
        marginTop: 20,
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonFooter: {
        alignItems: "center",
        backgroundColor: "#000000",
        height: 40,
        margin: 16,
        padding: 10,
        borderRadius: 10,
        width: "50%",
        alignSelf: "center",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
    },
    buttontextFooter: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#ffffff",
    },
    popupView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('window').height,
    },
    modalContentView: {
        margin: 20,
        width: Dimensions.get("screen").width - 40,
        height: 230,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
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
    titletext: {
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonView: {
        borderWidth: 1,
        width: 100,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 10,
        borderColor: "black",
        marginTop: 15,
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
});
