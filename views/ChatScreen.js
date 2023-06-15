import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Text
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
  const [templatePhrase, setTemplatePhrase] = useState(true)
  const [userVoice, setUserVoice] = useState('Start with the first question')
  const [started, setStarted] = useState(false)
  const [gptResponse, setGptResponse] = useState('')

  useEffect(() => {
    Voice.onSpeechError = onSpeechError
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const startSpeechToText = async () => {
    setTemplatePhrase(false)

    await Voice.start('en-US')
    setStarted(true)
  }

  const handleSend = () => {
    setUserVoice('')
    setStarted(false)
    setTemplatePhrase(false)
    setMessageArray(prev => [
      ...prev,
      {
        id: 1,
        text: userVoice,
        sender: 'Me',
        img: require('../assets/user.png')
      },
      {
        id: 1,
        text: 'Loading...',
        sender: 'ChatGPT',
        img: require('../assets/ChatGPT_logo.png')
      }
    ])
    fetch('https://motivate-dev.vercel.app/api/englishia', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userResponse: userVoice })
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        setGptResponse(res.result)
        setMessageArray(prev => prev.slice(0, -1))
        setMessageArray(prev => [
          ...prev,
          {
            id: 1,
            text: res.result,
            sender: 'ChatGPT',
            img: require('../assets/ChatGPT_logo.png')
          }
        ])
      })
      .catch(err => {
        console.log('ERROR', err)
      })
  }
  const stopSpeechToText = async () => {
    await Voice.stop()
    await Voice.destroy().then(Voice.removeAllListeners)
    setStarted(false)
  }

  const onSpeechResults = async result => {
    setUserVoice(prev => prev + ' ' + result.value[0])

    await Voice.start('en-US')
  }

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
                width: started ? '100%' : '85%',
                justifyContent: 'space-evenly'
              }
            ]}
          >
            <TextInput
              onChangeText={setUserVoice}
              editable={!templatePhrase}
              multiline={true}
              disa
              placeholder='Message'
              value={userVoice}
              style={{
                height: 38,
                width: '100%',
                color: 'black'
              }}
            />

            {
              <>
                {!started && !userVoice && (
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
          {!started && (
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
          )}
        </View>
      </>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
