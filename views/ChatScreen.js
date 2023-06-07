import React, { useState } from 'react'
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
import styles from '../styles/main'
const DATA_MESSAGES = [
  {
    id: 1,
    text: 'Hi',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
  },
  {
    id: 1,
    text: 'Hello',
    sender: 'Me',
    img: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
  },
  {
    id: 1,
    text: 'To style the header in React Navigation use a header object inside the navigationOptions object',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
  },
  {
    id: 1,
    text: 'Hi',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
  },
  {
    id: 1,
    text: 'Hello',
    sender: 'Me',
    img: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
  },
  {
    id: 1,
    text: 'To style the header in React Navigation use a header object inside the navigationOptions object',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
  },
  {
    id: 1,
    text: 'Hi',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
  },
  {
    id: 1,
    text: 'Hello',
    sender: 'Me',
    img: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
  },
  {
    id: 1,
    text: 'To style the header in React Navigation use a header object inside the navigationOptions object',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
  },
  {
    id: 1,
    text: 'Hi',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
  },
  {
    id: 1,
    text: 'Hello',
    sender: 'Me',
    img: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
  },
  {
    id: 1,
    text: 'To style the header in React Navigation use a header object inside the navigationOptions object',
    sender: 'Shuja Khalid',
    img: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg'
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
          source={{ uri: item.img }}
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

const ChatScreen = () => {
  const [messageArray, setMessageArray] = useState(DATA_MESSAGES ?? [])
  const [text, onChangeText] = React.useState('')
  const _renderMessages = ({ item }) => {
    return <Chats item={item} />
  }

  const headerComponent = () => (
    <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.94)' }}>
      <View
        style={[
          { paddingBottom: 20 },
          styles.bdbtm4,
          styles.bdGrey,
          styles.pdlt10,
          styles.pdrt10,
          styles.frow,
          styles.jspaceBw
        ]}
      >
        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{'algo aca'}</Text>
          <Text style={[styles.f18, styles.clBl]}>Online</Text>
        </View>
      </View>
    </View>
  )

  const handleSend = () => {
    setMessageArray(prev => [
      ...prev,
      {
        id: 1,
        text: text,
        sender: 'Me',
        img: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
      }
    ])
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
          ListHeaderComponent={headerComponent}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: '#D3D3D388' }}
        />
        <View
          style={{
            width: width,
            backgroundColor: '#FFF',
            borderTopColor: '#d4d4d4',
            borderTopWidth: 1,
            paddingTop: 15,
            paddingBottom: 5
          }}
        >
          <View
            style={[styles.frow, styles.jspaceBw, styles.pdrt10, styles.pdlt10]}
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
            <TouchableOpacity onPress={handleSend}>
              <Text style={[styles.fb, styles.clBl]}>Send</Text>
            </TouchableOpacity>
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
