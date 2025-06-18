// purchaseHistory/PurchaseHistory.controller.ts
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getTablesData } from "../../../api/services/analitcys/analytics";
import { getHisoricy } from "../../../api/services/historics/historics";
import { useFocusEffect } from '@react-navigation/native';

export interface PurchaseHistoryItem {
  id: number;
  username: string;
  items: Array<{
    wineId: number;
    quantity: number;
    price: number;
  }>;
  totalPrice: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | string;
  paymentMethod: "PIX" | "CREDIT_CARD" | "BOLETO" | string;
  createdAt: string;
}

export function usePurchaseHistoryController() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "delivered" | "in_transit" | "processing" | "cancelled"
  >("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>(
    []
  );

  const loadPurchaseHistory = async () => {
    try {
      const data: PurchaseHistoryItem[] = await getHisoricy();

      const formattedData = data.map((item) => ({
        ...item,
        createdAtFormatted: new Date(item.createdAt).toLocaleDateString(
          "pt-BR"
        ),
      }));

      console.log(JSON.stringify(formattedData, null, 2));
      setPurchaseHistory(formattedData);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o histórico de compras.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPurchaseHistory();
    }, [])
  );

  const filteredPurchases = purchaseHistory.filter((purchase) =>
    selectedFilter === "all" ? true : purchase.status === selectedFilter
  );

  const filterOptions = [
    { key: "all", label: "Todos", count: purchaseHistory.length },
    {
      key: "delivered",
      label: "Entregues",
      count: purchaseHistory.filter((p) => p.status === "delivered").length,
    },
    {
      key: "in_transit",
      label: "Em Trânsito",
      count: purchaseHistory.filter((p) => p.status === "in_transit").length,
    },
    {
      key: "processing",
      label: "Processando",
      count: purchaseHistory.filter((p) => p.status === "processing").length,
    },
    {
      key: "cancelled",
      label: "Cancelados",
      count: purchaseHistory.filter((p) => p.status === "cancelled").length,
    },
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