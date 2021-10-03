import { Button, Input } from 'react-native-elements';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from 'react-native-elements/dist/icons/Icon';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection('chats')
      .add({ chatName: input })
      .then(() => navigation.goBack())
      .catch((error) => alert(error));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black' />
        }
      />
      <Button disable={!input} onPress={createChat} title='Create new chat' />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 30,
    backgroundColor: 'white',
  },
});
