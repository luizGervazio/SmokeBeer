import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
  id: number;
  name: string;
  type: string;
  year: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_STORAGE_KEY = "@meu_app_carrinho";

export function useCartController() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /* ---- carrega do AsyncStorage uma única vez ---- */
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (stored) setCartItems(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    })();
  }, []);

  /* ---- salva sempre que cartItems mudar ---- */
  useEffect(() => {
    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems)).catch((e) =>
      console.error("Erro ao salvar carrinho:", e)
    );
  }, [cartItems]);

  /* ----- helpers ----- */
  const getTotalPrice = () =>
    cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const getTotalItems = () =>
    cartItems.reduce((t, i) => t + i.quantity, 0);

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
    Alert.alert(
      "Finalizar Compra",
      `Total: R$ ${getTotalPrice().toFixed(2)}`,
      [
        { text: "Continuar Comprando", style: "cancel" },
        {
          text: "Finalizar",
          onPress: async () => {
            try {
              await fetch("https://sua-api.com/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  items: cartItems,
                  total: getTotalPrice() + 15,
                }),
              });
              await AsyncStorage.removeItem(CART_STORAGE_KEY);
              setCartItems([]);
              Alert.alert("Compra Finalizada", "Pedido enviado com sucesso!");
            } catch (e) {
              console.error("Erro no checkout:", e);
              Alert.alert("Erro", "Falha ao processar a compra.");
            }
          },
        },
      ]
    );
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
