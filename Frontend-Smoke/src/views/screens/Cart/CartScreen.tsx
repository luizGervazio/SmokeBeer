
import { useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from "react-native"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react-native"

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chanceler Reserva",
      type: "Tinto Seco",
      year: "2020",
      price: 89.9,
      quantity: 2,
      image: "https://via.placeholder.com/80x120/8B5CF6/FFFFFF?text=Vinho",
    },
    {
      id: 2,
      name: "Miolo Lote 43",
      type: "Tinto Suave",
      year: "2019",
      price: 125.0,
      quantity: 1,
      image: "https://via.placeholder.com/80x120/DC2626/FFFFFF?text=Vinho",
    },
    {
      id: 3,
      name: "Casa Valduga Branco",
      type: "Branco Seco",
      year: "2021",
      price: 65.5,
      quantity: 3,
      image: "https://via.placeholder.com/80x120/F59E0B/FFFFFF?text=Vinho",
    },
  ])

  const updateQuantity = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = increment ? item.quantity + 1 : item.quantity - 1
          return { ...item, quantity: Math.max(1, newQuantity) }
        }
        return item
      }),
    )
  }

  const removeItem = (id) => {
    Alert.alert("Remover Item", "Tem certeza que deseja remover este item do carrinho?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => setCartItems((prevItems) => prevItems.filter((item) => item.id !== id)),
      },
    ])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    Alert.alert(
      "Finalizar Compra",
      `Total: R$ ${getTotalPrice().toFixed(2).replace(".", ",")}\nItens: ${getTotalItems()}`,
      [
        { text: "Continuar Comprando", style: "cancel" },
        { text: "Finalizar", onPress: () => console.log("Processar pagamento") },
      ],
    )
  }

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>
          {item.type} • {item.year}
        </Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2).replace(".", ",")}</Text>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, false)}>
            <Minus size={16} color="#6B7280" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, true)}>
            <Plus size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  )

  if (cartItems.length === 0) {
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
          <Text style={styles.emptySubtitle}>Adicione alguns vinhos ao seu carrinho</Text>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
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
            <Text style={styles.totalValue}>R$ {getTotalPrice().toFixed(2).replace(".", ",")}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Frete:</Text>
            <Text style={styles.totalValue}>R$ 15,00</Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total:</Text>
            <Text style={styles.finalTotalValue}>R$ {(getTotalPrice() + 15).toFixed(2).replace(".", ",")}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  itemImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  itemType: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
  },
  itemActions: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginHorizontal: 16,
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  totalSection: {
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    marginTop: 8,
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
  },
  checkoutButton: {
    backgroundColor: "#2563EB",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },
  continueButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
