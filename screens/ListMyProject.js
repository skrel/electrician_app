import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  Dimensions, 
  TextInput, 
  SafeAreaView,
  DeviceEventEmitter } from 'react-native'
import React, {useEffect, useState} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import database from '../firebase'
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function ListMyProject() {

  const navigation = useNavigation();
  const [listProject, setListProject] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState('')

  useEffect(() => {
    getListProject()
  }, [modalVisible])

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'reloadItems',
      () => {
        console.log('hihi')
        getListProject()
      }
    )
    return () => subscription.remove()
  }, [])

  const getListProject = async () => {
    database.collection('users').where('userId', '==', auth.currentUser.uid ).get().then( async(snapshot) => {
      // let data = snapshot.data();
      let response = []
      snapshot
        .forEach(documentSnapshot => {
          item = {...documentSnapshot.data(), id: documentSnapshot.id};
          response.push(item)
        });
      setListProject(response)
      console.log(response)
    });
  }

  const addNewProject = async () => {
    if(projectName) {
      const data = {
        userId: auth.currentUser.uid,
        name: projectName,
        projects: []
      }
      await database.collection('users').add(data);
      setModalVisible(false)
    }
  }

  //delete project
  const removeProject = async () => {
    if(projectName) {
      let projectQuery = database.collection('users').where('name', '==', projectName)
      projectQuery.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
      //if ...
      //alert('Project' + projectName + ' has been deleted. Refresh the page');
      setModalVisible(false)
    }
  }

  const renderItem = ({item, index}) => (
    <TouchableOpacity key={index} style={styles.itemView} onPress={() => navigation.navigate('DetailProject', item)}>
        <Text>{item?.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={[styles.screenTitle]}>My Projects</Text>
      <View style={styles.container}>
        <FlatList
          data={listProject}
          renderItem={renderItem}
          keyExtractor={({ id }) => id.toString()}
        />
      </View>

      
      <TouchableOpacity style={styles.buttonFooter} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttontextFooter}>Add/Delete Project</Text>
        </TouchableOpacity>
      

      <Modal animationType="fade"
          transparent={true}
          visible={modalVisible}
          presentationStyle="overFullScreen"
          >
          <View style={styles.popupView}>
            <View style={styles.modalContentView}>
              <Text style={[styles.titlePopuptext]}>Enter Project Name</Text> 
              <TextInput style={styles.inputView} placeholder="Name project..." onChangeText={(text) => setProjectName(text)}/>
              <View style={[styles.flexRow, styles.backgroundButtonModal]}>
                <TouchableOpacity style={styles.buttonView} onPress={() => setModalVisible(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonView} onPress={addNewProject}>
                  <Text>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonView} onPress={removeProject}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "row",
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flexRow: {
    flexDirection: "row",
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
  buttonAdd: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttontext: {
    //fontWeight: "bold",
    fontSize: 12,
    marginTop: 2,
    color: "#000000",
  },
  itemView: {
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8
  },
  viewButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 50,
    marginBottom: 10
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('window').height,
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
  backgroundButtonModal: {
    justifyContent: 'space-between',
  },
  titlePopuptext: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black'
  },
  inputView: {
    padding: 15, 
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 20
  },
  buttonView: {
    borderWidth: 1,
    width: 80,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: 'black'
  },
  flexRow: {
    flexDirection: "row",
  },
  screenTitle: {
    margin: 2,
    padding: 10,
    fontSize: 30,
    //fontStyle: "italic",
    //textDecorationLine: 'underline',
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
})