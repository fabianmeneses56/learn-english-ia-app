import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native'

import styles from '../styles/main'

const { width } = Dimensions.get('window')

const ChatMessageComponents = ({ item }) => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')

  const state = item.sender === 'Me'

  useEffect(() => {
    if (index < item.text.length && !state) {
      setTimeout(() => {
        setText(text + item.text[index])
        setIndex(index + 1)
      }, 0.3)
    } else {
      setText(item.text)
    }
  }, [index, item.text])
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
          <Text style={{ lineHeight: 25 }}>{text}</Text>
        </View>
      </View>
    </View>
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
export default ChatMessageComponents
