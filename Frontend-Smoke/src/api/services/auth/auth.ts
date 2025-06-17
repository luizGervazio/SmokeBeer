import api from '../../api';
import * as SecureStore from 'expo-secure-store';

export async function register(data: {
  name: string;
  document: string;
  password: string;
  phone: string;
  localization: string;
}) {
  return api.post('/users', { ...data, roles: ['user'] });
}


export async function login(document: string, password: string) {
  const { data } = await api.post('/auth/login', { document, password,  });
  await SecureStore.setItemAsync('token', data.access_token);
  return data.access_token;
}

export async function logout() {
  await SecureStore.deleteItemAsync('token');
}
