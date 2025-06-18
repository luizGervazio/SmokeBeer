import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { DollarSign, ShoppingCart } from 'lucide-react-native';
import { getTablesData, SumAndCount } from '../../../api/services/analitcys/analytics';

export interface Purchase {
  id: number;
  username: string;
  items: { wineId: number; quantity: number; price: number }[];
  totalPrice: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export function usePurchaseAnalyticsController() {
  const [salesData, setSalesData] = useState({ totalRevenue: 0, totalOrders: 0 });
  const [purchaseData, setPurchaseData] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  /** carrega agregados de receita e contagem */
  const loadSummary = async () => {
    try {
      const dados = await SumAndCount();
      setSalesData({
        totalRevenue: parseFloat(dados.total),
        totalOrders: parseInt(dados.count, 10),
      });
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo de vendas.');
    }
  };

  /** carrega todas as compras para a tabela */
  const loadPurchases = async () => {
    try {
      const dados: Purchase[] = await getTablesData();
      setPurchaseData(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as compras.');
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([loadSummary(), loadPurchases()]);
      setLoading(false);
    })();
  }, []);

  return { salesData, purchaseData, loading };
}