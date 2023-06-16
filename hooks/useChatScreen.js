import React, { useState, useEffect } from 'react'

import Voice from '@react-native-voice/voice'

import ChatMessageComponents from '../components/ChatMessageComponents'
import { DATA_MESSAGES } from '../config/constants'

export const useChatScreen = () => {
  const [userVoice, setUserVoice] = useState('Start with the first question')
  const [started, setStarted] = useState(false)
  const [messageArray, setMessageArray] = useState(DATA_MESSAGES)
  const [templatePhrase, setTemplatePhrase] = useState(true)

  const stopSpeechToText = async () => {
    await Voice.stop()
    await Voice.destroy().then(Voice.removeAllListeners)
    setStarted(false)
  }

  const onSpeechResults = async result => {
    setUserVoice(prev => prev + ' ' + result.value[0])

    await Voice.start('en-US')
  }

  const onSpeechError = async () => {
    Voice.cancel().then(Voice.start('en-US'))
  }

  const _renderMessages = ({ item }) => {
    return <ChatMessageComponents item={item} />
  }

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

  useEffect(() => {
    Voice.onSpeechError = onSpeechError
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  return {
    stopSpeechToText,
    onSpeechResults,
    onSpeechError,
    _renderMessages,
    userVoice,
    started,
    startSpeechToText,
    handleSend,
    messageArray,
    templatePhrase,
    setUserVoice
  }
}
