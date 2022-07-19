import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import React, {useState} from 'react'
import { FontAwesome } from '@expo/vector-icons';
import database from '../firebase'

export default function DetailProject({route}) {
  const [items, setItems] = useState(route?.params?.projects)

  const handleDeleteItemToFirebase = async (item) => {
    await database.collection('users').doc(route?.params?.id).update({
      projects: []
    })
    DeviceEventEmitter.emit('reloadItems')
    setItems([])
  }

  const renderItem = ({item, index}) => (
    <View style={styles.itemView}>
      <View
        style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}
      >
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
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.titletext}>{route?.params?.name}</Text>
        <TouchableOpacity onPress={handleDeleteItemToFirebase}>
          <FontAwesome name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonRegister}>
        <Text style={[styles.buttontextRegister]}> Send </Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={({ id }) => id.toString()}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20
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
    maxWidth:80,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 9,
    fontWeight: 'bold',
  },
  itemView: {
    marginTop: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonRegister: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    marginTop: 16,
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    borderWidth: 2,
  },
  buttontextRegister: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000000",
  },
})