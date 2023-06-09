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
    text: "Hello, I'm ChatGPT, an English language expert. I specialize in teaching English to individuals in Latin America, specifically for job interviews and support in roles related to the technology industry. How can I assist you today?",
    sender: 'ChatGPT',
    img: require('../assets/ChatGPT_logo.png')
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
  const [messageArray, setMessageArray] = useState(DATA_MESSAGES)
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
    await Voice.start('en-US')
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
    //         sender: 'ChatGPT',
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
    // handleSend()
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

  // console.log(gptResponse)

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
            backgroundColor: '#D3D3D388',
            // borderTopColor: '#D3D3D388',
            // borderTopWidth: 1,
            paddingTop: 5,
            paddingBottom: 22,
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 5
          }}
        >
          <View
            style={[
              styles.frow,
              styles.pdrt10,
              styles.pdlt10,
              {
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                borderRadius: 50,
                width: '85%',
                justifyContent: 'space-evenly'
              }
            ]}
          >
            <TextInput
              onChangeText={onChangeText}
              multiline={true}
              placeholder='Message'
              value={text}
              style={{
                height: 38,
                width: '100%'
                // backgroundColor: 'pink'
              }}
            />

            {
              <>
                {!started && !text && (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 2,
                      // backgroundColor: 'red',
                      padding: 10
                    }}
                    onPress={startSpeechToText}
                  >
                    <FontAwesome name='microphone' size={22} />
                  </TouchableOpacity>
                )}
                {started && (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 1,
                      padding: 7
                      // backgroundColor: 'orange'
                    }}
                    onPress={stopSpeechToText}
                  >
                    <Ionicons name='stop-circle' size={25} color='red' />
                  </TouchableOpacity>
                )}
              </>
            }
          </View>
          <View
            style={{
              // backgroundColor: 'brown',
              width: '15%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity style={{ padding: 7 }} onPress={handleSend}>
              <Ionicons name='send' size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    </KeyboardAvoidingView>
  )
}

const messages = StyleSheet.create({
  Chat: { maxWidth: width / 1.5, padding: 10 },
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
