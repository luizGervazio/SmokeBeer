import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewOrder } from "../../../api/services/ordes/order";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native"; // ou ''


export interface CartItem {
  id: number;
  name: string;
  type: string;
  year: string;
  price: number;
  quantity: number;
  image: string;
}

interface DecodedToken {
  name: string;
}

const CART_STORAGE_KEY = "@meu_app_carrinho";

export function useCartController() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      setCartItems(stored ? JSON.parse(stored) : []);
    } catch (e) {
      console.error("Erro ao carregar carrinho:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  useEffect(() => {
    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems)).catch(
      (e) => console.error("Erro ao salvar carrinho:", e)
    );
  }, [cartItems]);

  /* ----- helpers ----- */
  const getTotalPrice = () =>
    cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const getTotalItems = () => cartItems.reduce((t, i) => t + i.quantity, 0);

  /* ----- ações ----- */
  const updateQuantity = (id: number, inc: boolean) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + (inc ? 1 : -1)) }
          : item
      )
    );

  const removeItem = (id: number) =>
    Alert.alert("Remover Item", "Tem certeza que deseja remover este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () =>
          setCartItems((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);

  /* ----- checkout ----- */
  const handleCheckout = async () => {
    Alert.alert("Finalizar Compra", `Total: R$ ${getTotalPrice().toFixed(2)}`, [
      { text: "Continuar Comprando", style: "cancel" },
      {
        text: "Finalizar",
        onPress: async () => {
          const token = await SecureStore.getItemAsync("token");
          if (!token) throw new Error("Token não encontrado");

          const decoded = jwtDecode<DecodedToken>(token);
          const username = decoded.name;

          try {
            const payload = {
              username: username, // ou usar o user real logado
              items: cartItems.map((item) => ({
                wineId: item.id,
                quantity: item.quantity,
                price: item.price,
              })),
            };

            console.log(payload);
            // Envia dados via POST

            const response = await NewOrder(payload);

            console.log(response);

            // Limpa carrinho
            await AsyncStorage.removeItem(CART_STORAGE_KEY);
            setCartItems([]);

            Alert.alert("Compra Finalizada", "Pedido enviado com sucesso!");
          } catch (e) {
            console.error("Erro no checkout:", e);
            Alert.alert("Erro", "Falha ao processar a compra.");
          }
        },
      },
    ]);
  };

  return {
    cartItems,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    handleCheckout,
  };
}