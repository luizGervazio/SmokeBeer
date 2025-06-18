import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWines } from '../../../api/services/wine/wine';

export interface Wine {
  id: number;
  name: string;
  productor: string;
  country: string;
  region: string;
  year: number;
  alcoholContent: number;
  typeGrape: string;
  description: string;
  price: number;
  image?: string;
  quantity?: number;
}

export function useHomeController() {
  const [searchTerm, setSearchTerm] = useState('');
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state (react-native-paper)
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const showAlert = (message: string) => {
    setDialogMessage(message);
    setDialogVisible(true);
  };

  const carregarVinhos = async () => {
    try {
      const dados = await getWines();
      setWines(dados);
    } catch (error) {
      console.error('Erro ao carregar vinhos:', error);
      showAlert('Erro ao carregar vinhos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVinhos();
  }, []);

  const filteredWines = wines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.typeGrape.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (wine: Wine) => {
    try {
      const storedCart = await AsyncStorage.getItem('@meu_app_carrinho');
      let cartItems = storedCart ? JSON.parse(storedCart) : [];

      const index = cartItems.findIndex((item: Wine) => item.id === wine.id);

      if (index !== -1) {
        cartItems[index].quantity += 1;
      } else {
        cartItems.push({ ...wine, quantity: 1 });
      }

      await AsyncStorage.setItem('@meu_app_carrinho', JSON.stringify(cartItems));

      showAlert(`${wine.name} foi adicionado ao seu carrinho!`);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      showAlert('Erro ao adicionar ao carrinho.');
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredWines,
    loading,
    handleAddToCart,
    dialogVisible,
    dialogMessage,
    setDialogVisible,
  };
}
