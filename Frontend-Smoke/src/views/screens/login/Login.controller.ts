import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { login as loginService } from '../../../api/services/auth/auth'; // ⬅ renomeado aqui
import { useAuth } from '../../../auth/AuthContext/AuthContext';

type AuthStackParamList = {
  Login: undefined;
  NewAccount: undefined;
  Home: undefined;
};

type LoginScreenNavProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export function useLoginController() {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavProp>();
  const { login } = useAuth(); // pega login do contexto corretamente

  const handleLogin = async () => {
    if (!document || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const token = await loginService(document, password); // login na API
      console.log('Token recebido:', token);
      await login(); // login do contexto (ativa isLoggedIn)
    } catch (err) {
      console.error('Erro ao logar:', err);
      Alert.alert('Erro', 'Credenciais inválidas ou servidor offline');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('NewAccount');
  };

  return {
    document,
    password,
    setDocument,
    setPassword,
    handleLogin,
    handleCreateAccount,
  };
}
