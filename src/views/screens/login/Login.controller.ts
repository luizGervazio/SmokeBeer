import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { login as loginService } from '../../../api/services/auth/auth';
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
  const { login } = useAuth();

  // Estados para o dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const showAlert = (message: string) => {
    setDialogMessage(message);
    setDialogVisible(true);
  };

  const handleLogin = async () => {
    if (!document || !password) {
      showAlert('Preencha todos os campos!');
      return;
    }

    try {
      const token = await loginService(document, password);
      console.log('Token recebido:', token);
      await login();
    } catch (err) {
      console.error('Erro ao logar:', err);
      showAlert('Credenciais inválidas ou servidor offline.');
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
    dialogVisible,
    dialogMessage,
    setDialogVisible,
  };
}
