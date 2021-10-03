import { Button, Image, Input } from 'react-native-elements';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={{
          uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
        }}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus={true}
          keyboardType='email-address'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} title='Login' onPress={signIn} />
      <Button
        containerStyle={styles.button}
        title='Register'
        type='outline'
        onPress={() => navigation.navigate('Register')}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
