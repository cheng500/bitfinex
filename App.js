import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { configureStore } from './src/redux/'

import MainPage from './src/components/pages/MainPage/'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <MainPage />
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  },
})
