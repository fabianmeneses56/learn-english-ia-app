import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import styles from '../styles/main'
import { useChatScreen } from '../hooks/useChatScreen'

const { width } = Dimensions.get('window')

const ChatScreen = () => {
  const {
    stopSpeechToText,
    _renderMessages,
    userVoice,
    started,
    startSpeechToText,
    handleSend,
    messageArray,
    templatePhrase,
    setUserVoice
  } = useChatScreen()

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
            width,
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
              multiline
              disa
              placeholder='Message'
              value={userVoice}
              style={{
                height: 38,
                width: '100%',
                color: 'black'
              }}
            />

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
