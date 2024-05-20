import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard } from 'react-native';

export default function Login() {
  const [logo] = useState(new Animated.ValueXY({ x: 400, y: 400 }));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
  }, [])

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 300,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 300,
        duration: 100,
        useNativeDriver: false
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 400,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 400,
        duration: 100,
        useNativeDriver: false
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            marginTop: 100,
            width: logo.x,
            height: logo.y
          }}
          source={require("../assets/images/logo.png")} />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCorrect={false}
          onChange={() => { }}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChange={() => { }}
        />
        <Link href="/(tabs)/agendaScreen" asChild>
          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText: {
    color: '#FFF',
    fontSize: 18
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#222',
  }
});