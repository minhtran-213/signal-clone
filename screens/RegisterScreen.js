import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { auth } from '../firebase';
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Register',
      headerBackTitleVisible: true,
      headerBackTitle: 'Back to login',
    });
  }, [navigation]);
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            'https://st.quantrimang.com/photos/image/072015/22/avatar.jpg',
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full name'
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          style={styles.inputContainer}
          placeholder='Email'
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType='email-address'
        />
        <Input
          style={styles.inputContainer}
          placeholder='Password'
          autoFocus
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          style={styles.inputContainer}
          placeholder='Profile picture (optional)'
          autoFocus
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        containerStyle={styles.button}
        title='register'
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
