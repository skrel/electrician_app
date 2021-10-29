// In App.js in a new project

import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShopingCart from './screens/shopingCart.js';
import Shop from './screens/shop.js';

import sqliteTest from './screens/sqliteTest.js';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Shop"
        onPress={() => navigation.navigate('Shop')}
      />
      <Button
        title="Go to Shoping Cart"
        onPress={() => navigation.navigate('ShopingCart')}
      />
      <Button
        title="Go to SQLite Test"
        onPress={() => navigation.navigate('sqliteTest')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="ShopingCart" component={ShopingCart} />
        <Stack.Screen name="sqliteTest" component={sqliteTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;