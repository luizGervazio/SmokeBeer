"use client"

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
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, RotateCcw, Eye, Filter } from "lucide-react-native"

export default function PurchaseHistory() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  // Dados de exemplo do histórico de compras
  const purchaseHistory = [
    {
      id: "PED-001",
      date: "2024-01-15",
      status: "delivered",
      total: 179.8,
      items: [
        {
          id: 1,
          name: "Chanceler Reserva",
          type: "Tinto Seco",
          quantity: 2,
          price: 89.9,
          image: "https://via.placeholder.com/60x80/8B5CF6/FFFFFF?text=V",
        },
      ],
      deliveryDate: "2024-01-18",
    },
    {
      id: "PED-002",
      date: "2024-01-10",
      status: "delivered",
      total: 250.0,
      items: [
        {
          id: 2,
          name: "Miolo Lote 43",
          type: "Tinto Suave",
          quantity: 2,
          price: 125.0,
          image: "https://via.placeholder.com/60x80/DC2626/FFFFFF?text=V",
        },
      ],
      deliveryDate: "2024-01-13",
    },
    {
      id: "PED-003",
      date: "2024-01-08",
      status: "in_transit",
      total: 131.0,
      items: [
        {
          id: 3,
          name: "Casa Valduga Branco",
          type: "Branco Seco",
          quantity: 2,
          price: 65.5,
          image: "https://via.placeholder.com/60x80/F59E0B/FFFFFF?text=V",
        },
      ],
      estimatedDelivery: "2024-01-20",
    },
    {
      id: "PED-004",
      date: "2024-01-05",
      status: "cancelled",
      total: 314.7,
      items: [
        {
          id: 1,
          name: "Chanceler Reserva",
          type: "Tinto Seco",
          quantity: 1,
          price: 89.9,
          image: "https://via.placeholder.com/60x80/8B5CF6/FFFFFF?text=V",
        },
        {
          id: 2,
          name: "Miolo Lote 43",
          type: "Tinto Suave",
          quantity: 1,
          price: 125.0,
          image: "https://via.placeholder.com/60x80/DC2626/FFFFFF?text=V",
        },
      ],
      cancelReason: "Produto indisponível",
    },
    {
      id: "PED-005",
      date: "2024-01-02",
      status: "processing",
      total: 196.5,
      items: [
        {
          id: 3,
          name: "Casa Valduga Branco",
          type: "Branco Seco",
          quantity: 3,
          price: 65.5,
          image: "https://via.placeholder.com/60x80/F59E0B/FFFFFF?text=V",
        },
      ],
    },
  ]

  const filterOptions = [
    { key: "all", label: "Todos", count: purchaseHistory.length },
    { key: "delivered", label: "Entregues", count: purchaseHistory.filter((p) => p.status === "delivered").length },
    { key: "in_transit", label: "Em Trânsito", count: purchaseHistory.filter((p) => p.status === "in_transit").length },
    { key: "processing", label: "Processando", count: purchaseHistory.filter((p) => p.status === "processing").length },
    { key: "cancelled", label: "Cancelados", count: purchaseHistory.filter((p) => p.status === "cancelled").length },
  ]

  const filteredPurchases = purchaseHistory.filter((purchase) =>
    selectedFilter === "all" ? true : purchase.status === selectedFilter,
  )


  const handleViewDetails = (purchase: any) => {
    const itemsList = purchase.items
      .map((item: any) => `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    let statusInfo = ""
    if (purchase.status === "delivered") {
      statusInfo = `\n📦 Entregue em: ${new Date(purchase.deliveryDate).toLocaleDateString("pt-BR")}`
    } else if (purchase.status === "in_transit") {
      statusInfo = `\n🚚 Previsão de entrega: ${new Date(purchase.estimatedDelivery).toLocaleDateString("pt-BR")}`
    } else if (purchase.status === "cancelled") {
      statusInfo = `\n❌ Motivo: ${purchase.cancelReason}`
    }

    Alert.alert(
      `Pedido ${purchase.id}`,
      `📅 Data: ${new Date(purchase.date).toLocaleDateString("pt-BR")}\n\n🍷 Itens:\n${itemsList}\n\n💰 Total: R$ ${purchase.total.toFixed(2)}${statusInfo}`,
      [
        { text: "Fechar", style: "cancel" },
        ...(purchase.status === "delivered"
          ? [{ text: "Comprar Novamente", onPress: () => handleReorder() }]
          : []),
      ],
    )
  }

  const handleReorder = () => {
  }

  const PurchaseCard = ({ purchase }: { purchase: any }) => {

    return (
      <TouchableOpacity style={styles.purchaseCard} activeOpacity={0.8} onPress={() => handleViewDetails(purchase)}>
        <View style={styles.purchaseHeader}>
          <View>
            <Text style={styles.purchaseId}>Pedido {purchase.id}</Text>
            <Text style={styles.purchaseDate}>{new Date(purchase.date).toLocaleDateString("pt-BR")}</Text>
          </View>
        </View>

        <View style={styles.itemsContainer}>
          {purchase.items.slice(0, 2).map((item: any, index: number) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemType}>
                  {item.type} • Qtd: {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          {purchase.items.length > 2 && (
            <Text style={styles.moreItems}>+{purchase.items.length - 2} item(s) adicional(is)</Text>
          )}
        </View>

        <View style={styles.purchaseFooter}>
          <Text style={styles.totalLabel}>Total: </Text>
          <Text style={styles.totalValue}>R$ {purchase.total.toFixed(2)}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleViewDetails(purchase)}>
              <Eye size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Compras</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterMenu(!showFilterMenu)}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Filter Menu */}
      {showFilterMenu && (
        <View style={styles.filterMenu}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.filterOption, selectedFilter === option.key && styles.filterOptionActive]}
              onPress={() => {
                setSelectedFilter(option.key)
                setShowFilterMenu(false)
              }}
            >
              <Text style={[styles.filterOptionText, selectedFilter === option.key && styles.filterOptionTextActive]}>
                {option.label} ({option.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{purchaseHistory.length}</Text>
          <Text style={styles.summaryLabel}>Total de Pedidos</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>R$ {purchaseHistory.reduce((sum, p) => sum + p.total, 0).toFixed(0)}</Text>
          <Text style={styles.summaryLabel}>Valor Total</Text>
        </View>
      </View>

      <ScrollView
        style={styles.purchasesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.purchasesListContent}
      >
        {filteredPurchases.length > 0 ? (
          filteredPurchases.map((purchase) => <PurchaseCard key={purchase.id} purchase={purchase} />)
        ) : (
          <View style={styles.emptyState}>
            <Package size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>Nenhuma compra encontrada</Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedFilter === "all" ? "Você ainda não fez nenhuma compra" : "Nenhuma compra com este status"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
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
  filterButton: {
    padding: 8,
  },
  filterMenu: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 8,
  },
  filterOption: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  filterOptionActive: {
    backgroundColor: "#EFF6FF",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#6B7280",
  },
  filterOptionTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  summaryCard: {
    flex: 1,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  purchasesList: {
    flex: 1,
  },
  purchasesListContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  purchaseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  purchaseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  purchaseId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  purchaseDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 50,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  itemType: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#059669",
  },
  moreItems: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
    marginLeft: 52,
  },
  purchaseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
})
