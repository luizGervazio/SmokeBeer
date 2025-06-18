// Cart.controller.ts
import { useState } from 'react';
import { Alert } from 'react-native';

export interface CartItemType {
  id: number;
  name: string;
  type: string;
  year: string;
  price: number;
  quantity: number;
  image: string;
}

export function useCartController() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      name: 'Chanceler Reserva',
      type: 'Tinto Seco',
      year: '2020',
      price: 89.9,
      quantity: 2,
      image: 'https://via.placeholder.com/80x120/8B5CF6/FFFFFF?text=Vinho',
    },
    {
      id: 2,
      name: 'Miolo Lote 43',
      type: 'Tinto Suave',
      year: '2019',
      price: 125.0,
      quantity: 1,
      image: 'https://via.placeholder.com/80x120/DC2626/FFFFFF?text=Vinho',
    },
    {
      id: 3,
      name: 'Casa Valduga Branco',
      type: 'Branco Seco',
      year: '2021',
      price: 65.5,
      quantity: 3,
      image: 'https://via.placeholder.com/80x120/F59E0B/FFFFFF?text=Vinho',
    },
  ]);

  const updateQuantity = (id: number, increment: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    Alert.alert('Remover Item', 'Tem certeza que deseja remover este item do carrinho?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => setCartItems((prevItems) => prevItems.filter((item) => item.id !== id)),
      },
    ]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    Alert.alert(
      'Finalizar Compra',
      `Total: R$ ${getTotalPrice().toFixed(2).replace('.', ',')}\nItens: ${getTotalItems()}`,
      [
        { text: 'Continuar Comprando', style: 'cancel' },
        { text: 'Finalizar', onPress: () => console.log('Processar pagamento') },
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