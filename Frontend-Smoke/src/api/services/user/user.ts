import api from '../../api';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode'; // ✅ certo

interface DecodedToken {
  sub: number;
}

export async function getUser() {
  const token = await SecureStore.getItemAsync('token');
  if (!token) throw new Error('Token não encontrado');

  const decoded = jwtDecode<DecodedToken>(token);
  const userId = decoded.sub;

  const response = await api.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateUser(data: {
  name: string;
  document: string;
  phone: string;
  localization: string;
}) {
  const token = await SecureStore.getItemAsync('token');
  if (!token) throw new Error('Token não encontrado');

  const decoded = jwtDecode<DecodedToken>(token);
  const userId = decoded.sub;

  const response = await api.patch(`/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

