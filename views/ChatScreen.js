import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import Voice from '@react-native-voice/voice'

import styles from '../styles/main'

const DATA_MESSAGES = [
  {
    id: 1,
    text: 'Hi',
    sender: 'Shuja Khalid',
    img: require('../assets/ChatGPT_logo.png')
  },
  {
    id: 1,
    text: 'Hello',
    sender: 'Me',
    img: require('../assets/user.png')
  }
]

const { width, height } = Dimensions.get('window')
const Chats = ({ item }) => {
  var state = item.sender === 'Me'

  return (
    <View
      style={[
        styles.pdlt10,
        styles.mdtp10,
        styles.mdbt10,
        styles.pdtp10,
        item.sender === 'Me' ? styles.frowrev : styles.frow,
        styles.jStart
      ]}
    >
      <View style={state ? styles.pdlt10 : styles.pdrt10}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50 }}
          source={item.img}
        />
      </View>
      <View>
        <View
          style={[messages.Chat, state ? messages.myChat : messages.frnChat]}
        >
          <Text style={{ lineHeight: 25 }}>{item.text}</Text>
        </View>
      </View>
    </View>
  )
}

// const headerComponent = () => (
//   <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.94)' }}>
//     <View
//       style={[
//         { paddingBottom: 20 },
//         styles.bdbtm4,
//         styles.bdGrey,
//         styles.pdlt10,
//         styles.pdrt10,
//         styles.frow,
//         styles.jspaceBw
//       ]}
//     >
//       <View>
//         <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{'algo aca'}</Text>
//         <Text style={[styles.f18, styles.clBl]}>Online</Text>
//       </View>
//     </View>
//   </View>
// )

// {text ? (
//   <TouchableOpacity onPress={handleSend}>
//     <Text style={[styles.fb, styles.clBl]}>Send</Text>
//   </TouchableOpacity>
// ) : (
//   <>
//     {!started && (
//       <TouchableOpacity onPress={startSpeechToText}>
//         <FontAwesome name='microphone' size={25} />
//       </TouchableOpacity>
//     )}
//     {started && (
//       <TouchableOpacity onPress={stopSpeechToText}>
//         <Ionicons name='send' size={25} />
//       </TouchableOpacity>
//     )}
//   </>
// )}
const ChatScreen = () => {
  const [messageArray, setMessageArray] = useState([])
  const [text, onChangeText] = useState('')

  const [started, setStarted] = useState(false)
  const [gptResponse, setGptResponse] = useState('')
  // const [results, setResults] = useState([])

  useEffect(() => {
    Voice.onSpeechError = onSpeechError
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const startSpeechToText = async () => {
    await Voice.start('en-NZ')
    setStarted(true)
  }
  const handleSend = () => {
    onChangeText('')
    setStarted(false)
    setMessageArray(prev => [
      ...prev,
      {
        id: 1,
        text: text,
        sender: 'Me',
        img: require('../assets/user.png')
      }
    ])
    // fetch('https://motivate-dev.vercel.app/api/englishia', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ userResponse: text })
    // })
    //   .then(response => response.json())
    //   .then(res => {
    //     console.log(res)
    //     setGptResponse(res.result)
    //     setMessageArray(prev => [
    //       ...prev,
    //       {
    //         id: 1,
    //         text: res.result,
    //         sender: 'Shuja Khalid',
    //         img: require('../assets/ChatGPT_logo.png')
    //       }
    //     ])
    //   })
    //   .catch(err => {
    //     // setLoading(false)
    //     // setResult('Error...')
    //     console.log('ERROR', err)
    //   })
  }
  const stopSpeechToText = async () => {
    await Voice.stop()
    setStarted(false)
    handleSend()
  }

  const onSpeechResults = result => {
    console.log('ACA', result)
    // setResults(result.value[0])
    onChangeText(result.value[0])
  }

  // console.log(results)
  const onSpeechError = error => {
    console.log(error)
  }

  const _renderMessages = ({ item }) => {
    return <Chats item={item} />
  }

  console.log(gptResponse)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboarVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <>
        <FlatList
          data={messageArray}
          renderItem={_renderMessages}
          keyExtractor={(item, index) => String(index)}
          // ListHeaderComponent={headerComponent}
          // stickyHeaderIndices={[0]}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: '#D3D3D388' }}
        />
        <View
          style={{
            width: width,
            backgroundColor: '#FFF',
            borderTopColor: '#d4d4d4',
            borderTopWidth: 1,
            paddingTop: 5,
            paddingBottom: 5
          }}
        >
          <View
            style={[
              styles.frow,
              styles.jspaceBw,
              styles.pdrt10,
              styles.pdlt10,
              { display: 'flex', alignItems: 'center' }
            ]}
          >
            <TextInput
              onChangeText={onChangeText}
              multiline={true}
              placeholder='type your message'
              value={text}
              style={{
                height: 45,
                width: width / 1.3
              }}
            />

            {
              <>
                {!started && (
                  <TouchableOpacity onPress={startSpeechToText}>
                    <FontAwesome name='microphone' size={25} />
                  </TouchableOpacity>
                )}
                {started && (
                  <TouchableOpacity onPress={stopSpeechToText}>
                    <Ionicons name='send' size={25} />
                  </TouchableOpacity>
                )}
              </>
            }
          </View>
        </View>
      </>
    </KeyboardAvoidingView>
  )
}

const messages = StyleSheet.create({
  Chat: { maxWidth: width / 2, padding: 10 },
  myChat: {
    backgroundColor: '#aaeedd',
    borderRadius: 14
  },
  frnChat: {
    backgroundColor: '#aaeeaa',
    borderRadius: 14
  }
})

export default ChatScreen
