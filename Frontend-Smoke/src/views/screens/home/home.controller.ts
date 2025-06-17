import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getWines } from '../../../api/services/wine/wine';

export type Wine = {
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
};

export function useHomeController() {
  const [searchTerm, setSearchTerm] = useState('');
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);

  /* ------------ carregar vinhos -------------- */
  const carregarVinhos = async () => {
    try {
      const dados: Wine[] = await getWines();
      setWines(dados);
    } catch (e) {
      console.error('Erro ao carregar vinhos:', e);
      Alert.alert('Erro', 'Não foi possível carregar os vinhos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVinhos();
  }, []);

  /* ------------ filtrar por termo -------------- */
  const filteredWines = wines.filter((wine) => {
    const t = searchTerm.toLowerCase();
    return (
      wine.name.toLowerCase().includes(t) ||
      wine.typeGrape.toLowerCase().includes(t) ||
      wine.region.toLowerCase().includes(t)
    );
  });

  /* ------------ adicionar ao carrinho -------------- */
  const handleAddToCart = (wine: Wine) => {
    Alert.alert('Adicionado ao Carrinho! 🛒', `${wine.name} foi adicionado.\n\nPreço: ${wine.price}`);
  };

  return {
    searchTerm,
    setSearchTerm,
    loading,
    filteredWines,
    handleAddToCart,
  };
}
