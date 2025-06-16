import React from 'react';
import { View, Text, Button } from 'react-native';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <Button title="Entrar" onPress={() => setIsLoggedIn(true)} />
    </View>
  );
}
