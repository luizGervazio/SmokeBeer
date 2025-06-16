import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

type AuthStackParamList = {
  Login: undefined;
  NewAccount: undefined;
};

type LoginScreenNavProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export default function Login({ setIsLoggedIn }: LoginProps) {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavProp>();

  const handleLogin = () => {
    setIsLoggedIn(true);
    Alert.alert('Login', `Documento: ${document}\nSenha: ${password}`);
  };

  const handleCreateAccount = () => {
    navigation.navigate('NewAccount');   // 👉 agora navega
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Smoker & Beer</Text>

        <TextInput
          style={styles.input}
          placeholder="Documento"
          keyboardType="numeric"
          autoCapitalize="none"
          value={document}
          onChangeText={setDocument}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.createAccountButton]}
          onPress={handleCreateAccount}
        >
          <Text style={[styles.buttonText, styles.createAccountText]}>
            Criar Conta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 18,
    textAlign: 'center'
  },
  input: {
    height: 48,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB'
  },
  button: {
    backgroundColor: '#2563EB',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  createAccountButton: {
    width: '100%',
    backgroundColor: '#E0E7FF',
    marginBottom: 36
  },
  createAccountText: {
    color: '#2563EB',
    fontWeight: '600'
  },
  footer: {
    alignItems: 'center'
  },
});