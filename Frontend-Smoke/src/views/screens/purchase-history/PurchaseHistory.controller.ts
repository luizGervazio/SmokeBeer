// purchaseHistory/PurchaseHistory.controller.ts
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getTablesData } from '../../../api/services/analitcys/analytics';

export interface PurchaseHistoryItem {
  id: string;
  date: string;
  status: 'delivered' | 'in_transit' | 'processing' | 'cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  deliveryDate?: string;
  estimatedDelivery?: string;
  cancelReason?: string;
}

export function usePurchaseHistoryController() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'delivered' | 'in_transit' | 'processing' | 'cancelled'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);

  const loadPurchaseHistory = async () => {
    try {
      // Substituir essa linha pela requisição real ao backend futuramente
      const data: PurchaseHistoryItem[] = await getTablesData();
      setPurchaseHistory(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o histórico de compras.');
    }
  };

  useEffect(() => {
    loadPurchaseHistory();
  }, []);

  const filteredPurchases = purchaseHistory.filter((purchase) =>
    selectedFilter === 'all' ? true : purchase.status === selectedFilter
  );

  const filterOptions = [
    { key: 'all', label: 'Todos', count: purchaseHistory.length },
    { key: 'delivered', label: 'Entregues', count: purchaseHistory.filter((p) => p.status === 'delivered').length },
    { key: 'in_transit', label: 'Em Trânsito', count: purchaseHistory.filter((p) => p.status === 'in_transit').length },
    { key: 'processing', label: 'Processando', count: purchaseHistory.filter((p) => p.status === 'processing').length },
    { key: 'cancelled', label: 'Cancelados', count: purchaseHistory.filter((p) => p.status === 'cancelled').length },
  ];

  return {
    selectedFilter,
    setSelectedFilter,
    showFilterMenu,
    setShowFilterMenu,
    purchaseHistory,
    filteredPurchases,
    filterOptions,
  };
}