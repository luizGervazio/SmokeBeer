import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getUser, updateUser } from '../../../api/services/user/user';
import { useAuth } from '../../../auth/AuthContext/AuthContext'; // ✅ IMPORTANTE

export function useUserController() {
  const { logout } = useAuth(); // ✅ Aqui pega o método do contexto

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    document: '',
    phone: '',
    localization: '',
    profileImage: 'https://via.placeholder.com/120',
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUserInfo(data);
        setEditedInfo(data);
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await updateUser(editedInfo);
      setUserInfo(editedInfo);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  const handleImagePicker = () => {
    Alert.alert('Alterar Foto', 'Escolha uma opção:', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Câmera', onPress: () => console.log('Abrir câmera') },
      { text: 'Galeria', onPress: () => console.log('Abrir galeria') },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: logout, // ✅ Agora chama o logout do contexto
      },
    ]);
  };

  return {
    isEditing,
    setIsEditing,
    userInfo,
    editedInfo,
    setEditedInfo,
    handleSave,
    handleCancel,
    handleImagePicker,
    handleLogout, // ✅ Agora funciona de verdade
  };
}
