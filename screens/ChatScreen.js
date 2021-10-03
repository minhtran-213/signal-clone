import * as firebase from 'firebase';

import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { auth, db } from '../firebase';

import { Avatar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL,
            }}
          />
          <Text
            style={{
              color: 'white',
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}>
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='white' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='white' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput('');
  };
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='light' />
      <View
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      source={{ uri: data.photoURL }}
                      containerStyle={{
                        position: 'absolute',
                        bottom: 10,
                        right: -20,
                      }}
                      rounded
                      position='absolute'
                      bottom={10}
                      right={-20}
                      size={30}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position='absolute'
                      containerStyle={{
                        position: 'absolute',
                        bottom: -10,
                        left: -5,
                      }}
                      bottom={10}
                      left={-20}
                      rounded
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder='Signal message'
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name='send' size={24} color='#2B68E6' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    // borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 20,
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 30,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    margin: 15,
    borderRadius: 20,
    maxWidth: '80%',
    position: 'relative',
    marginLeft: 30,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
  receiverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
});
