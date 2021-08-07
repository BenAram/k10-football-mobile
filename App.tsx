import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';

import StackNavigator from './src/navigators/Stack';

import store from './src/store';

export default function App() {

  const [loaded] = useFonts({
    BebasNeue: require('./src/fonts/Bebas-Neue-Pro-Regular.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <StackNavigator/>
        <StatusBar style="light" backgroundColor="#292C2F" />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});