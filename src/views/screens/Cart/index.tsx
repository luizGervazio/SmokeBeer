"use client";

import React from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react-native";
import { styles } from "./styles";
import { useCartController } from "./Cart.controller";
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    handleCheckout,
  } = useCartController();
  const navigation = useNavigation();

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>
          {item.type} • {item.year}
        </Text>
        <Text style={styles.itemPrice}>
          R$ {(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, false)}
          >
            <Minus size={16} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, true)}
          >
            <Plus size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!cartItems.length) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carrinho</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyCart}>
          <ShoppingBag size={80} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Carrinho Vazio</Text>
          <Text style={styles.emptySubtitle}>
            Adicione alguns vinhos ao seu carrinho
          </Text>
          <TouchableOpacity style={styles.continueButton } onPress={() => navigation.navigate('Catálogos') }>
            <Text style={styles.continueButtonText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carrinho ({getTotalItems()})</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              R$ {getTotalPrice().toFixed(2)}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total:</Text>
            <Text style={styles.finalTotalValue}>
              R$ {(getTotalPrice()).toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
