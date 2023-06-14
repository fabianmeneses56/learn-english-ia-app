import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import Voice from '@react-native-voice/voice'

import styles from '../styles/main'
import ChatMessageComponents from '../components/ChatMessageComponents'

const DATA_MESSAGES = [
  {
    id: 1,
    text: "Hello, I'm ChatGPT, an English language expert. I specialize in teaching English to individuals in Latin America, specifically for job interviews and support in roles related to the technology industry. How can I assist you today?",
    sender: 'ChatGPT',
    img: require('../assets/ChatGPT_logo.png')
  }
]

const { width, height } = Dimensions.get('window')

const ChatScreen = () => {
  const [messageArray, setMessageArray] = useState(DATA_MESSAGES)
  const [text, onChangeText] = useState('')

  const [userVoice, setUserVoice] = useState('Start with the first question')

  const [started, setStarted] = useState(false)
  const [gptResponse, setGptResponse] = useState('')
  // const [results, setResults] = useState([])

  useEffect(() => {
    // Voice.onSpeechStart = onSpeechStart
    // Voice.onSpeechRecognized = onSpeechRecognized
    // Voice.onSpeechEnd = onSpeechEnd
    // // Voice.onSpeechError = this.onSpeechError;
    // // Voice.onSpeechResults = this.onSpeechResults;
    // Voice.onSpeechPartialResults = onSpeechPartialResults
    // Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    Voice.onSpeechError = onSpeechError
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])
  // const onSpeechStart = async e => {
  //   console.log('onSpeechStart', e)
  // }
  // const onSpeechRecognized = async e => {
  //   console.log('onSpeechRecognized', e)
  // }
  // const onSpeechEnd = async e => {
  //   console.log('onSpeechEnd', e)
  // }
  // const onSpeechPartialResults = async e => {
  //   console.log('onSpeechPartialResults', e)
  // }
  const startSpeechToText = async () => {
    // console.log('isAvailable', await Voice.isRecognizing())
    await Voice.start('en-US')
    setStarted(true)
  }

  const handleSend = () => {
    onChangeText('')
    setUserVoice('')
    setStarted(false)
    setMessageArray(prev => [
      ...prev,
      {
        id: 1,
        text: userVoice,
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
    //   body: JSON.stringify({ userResponse: userVoice })
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
    await Voice.destroy().then(Voice.removeAllListeners)
    setStarted(false)
    // handleSend()
  }

  const onSpeechResults = async result => {
    // console.log('onSpeechResults', result.value[0])
    // setResults(result.value[0])
    setUserVoice(prev => prev + ' ' + result.value[0])
    onChangeText(result.value[0])

    await Voice.start('en-US')

    // console.log('MESSAGE', message)
  }

  // console.log('USER VOICE', userVoice)
  const onSpeechError = async error => {
    Voice.cancel().then(Voice.start('en-US'))
    console.log('onSpeechError', error)
  }

  const _renderMessages = ({ item }) => {
    return <ChatMessageComponents item={item} />
  }

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
          contentContainerStyle={{ flexGrow: 1, backgroundColor: '#D3D3D388' }}
        />
        <View
          style={{
            width: width,
            backgroundColor: '#D3D3D388',
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
              onChangeText={setUserVoice}
              multiline={true}
              placeholder='Message'
              value={userVoice}
              style={{
                height: 38,
                width: '100%'
              }}
            />

            {
              <>
                {!started && !text && (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 2,
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

export default ChatScreen
