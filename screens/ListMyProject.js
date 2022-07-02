import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Dimensions, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import database from '../firebase'
import { auth } from "../firebase";

export default function ListMyProject() {

  const [listProject, setListProject] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState('')

  useEffect(() => {
    getListProject()
  }, [modalVisible])

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

  const renderItem = ({item, index}) => (
    <View key={index} style={styles.itemView}>
        <Text>{item?.name}</Text>
    </View>
  )

  return (
    <>
    <View style={styles.container}>
      <Text style={{fontSize: 17}}>My Projects</Text>
      <FlatList
        data={listProject}
        renderItem={renderItem}
        keyExtractor={({ id }) => id.toString()}
      />
      <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
        <View style={styles.viewButton}>
          <MaterialIcons name="add" size={24} color="black" />
        </View>
        <Text>New Project</Text>
      </TouchableOpacity>
    </View>
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
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    alignSelf: 'center',
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
    color: 'red'
  },
  inputView: {
    padding: 15, 
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    marginVertical: 20
  },
  buttonView: {
    borderWidth: 1,
    width: 100,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: 'red'
  },
  flexRow: {
    flexDirection: "row",
  },
})