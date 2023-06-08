import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import Voice from '@react-native-voice/voice'
import ChatScreen from './views/ChatScreen'

// {/* <View style={styles.container}>
// <View style={styles.container}>
//   {!started ? (
//     <Button title='Start Speech to Text' onPress={startSpeechToText} />
//   ) : undefined}
//   {started ? (
//     <Button title='Stop Speech to Text' onPress={stopSpeechToText} />
//   ) : undefined}
//   {results.map((result, index) => (
//     <Text key={index}>{result}</Text>
//   ))}
//   <StatusBar style='auto' />
// </View>
// <StatusBar style='auto' />
// </View> */}

export default function App() {
  return (
    <View style={styles.container}>
      <ChatScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
