"use client"

import { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Alert } from "react-native"
import { DollarSign, ShoppingCart, Filter } from "lucide-react-native"

const { width } = Dimensions.get("window")

export default function PurchaseAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Dados de exemplo para análise
  const salesData = {
    totalRevenue: 15420.5,
    totalOrders: 89,
    averageOrder: 173.26,
    topWines: [
      { name: "Chanceler Reserva", sales: 45, revenue: 4045.5 },
      { name: "Miolo Lote 43", sales: 32, revenue: 4000.0 },
      { name: "Casa Valduga Branco", sales: 28, revenue: 1834.0 },
      { name: "Dom Pedrito Cabernet", sales: 22, revenue: 2640.0 },
      { name: "Salton Moscatel", sales: 18, revenue: 1260.0 },
    ],
    monthlyData: [
      { month: "Jan", revenue: 12500, orders: 65 },
      { month: "Fev", revenue: 14200, orders: 78 },
      { month: "Mar", revenue: 15420, orders: 89 },
      { month: "Abr", revenue: 13800, orders: 72 },
      { month: "Mai", revenue: 16900, orders: 95 },
      { month: "Jun", revenue: 18200, orders: 102 },
    ],
    categoryData: [
      { category: "Tinto Seco", percentage: 45, revenue: 6939.23 },
      { category: "Tinto Suave", percentage: 28, revenue: 4317.74 },
      { category: "Branco Seco", percentage: 18, revenue: 2775.69 },
      { category: "Rosé", percentage: 9, revenue: 1387.84 },
    ],
  }

  const purchaseData = [
    {
      id: 1,
      buyerName: "João Silva",
      totalValue: 179.8,
      date: "2024-01-15",
      items: [{ name: "Chanceler Reserva", quantity: 2, price: 89.9 }],
    },
    {
      id: 2,
      buyerName: "Maria Santos",
      totalValue: 250.0,
      date: "2024-01-14",
      items: [{ name: "Miolo Lote 43", quantity: 2, price: 125.0 }],
    },
    {
      id: 3,
      buyerName: "Pedro Costa",
      totalValue: 131.0,
      date: "2024-01-13",
      items: [{ name: "Casa Valduga Branco", quantity: 2, price: 65.5 }],
    },
    {
      id: 4,
      buyerName: "Ana Oliveira",
      totalValue: 314.7,
      date: "2024-01-12",
      items: [
        { name: "Chanceler Reserva", quantity: 1, price: 89.9 },
        { name: "Miolo Lote 43", quantity: 1, price: 125.0 },
        { name: "Dom Pedrito Cabernet", quantity: 1, price: 99.8 },
      ],
    },
    {
      id: 5,
      buyerName: "Carlos Ferreira",
      totalValue: 196.5,
      date: "2024-01-11",
      items: [{ name: "Casa Valduga Branco", quantity: 3, price: 65.5 }],
    },
    {
      id: 6,
      buyerName: "Lucia Mendes",
      totalValue: 89.9,
      date: "2024-01-10",
      items: [{ name: "Chanceler Reserva", quantity: 1, price: 89.9 }],
    },
  ]

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "#2563EB" }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
          <Icon size={24} color={color} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  )

  const showPurchaseDetails = (purchase) => {
    const itemsList = purchase.items
      .map(
        (item) =>
          `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`,
      )
      .join("\n")

    Alert.alert(
      `Detalhes da Compra - ${purchase.buyerName}`,
      `📅 Data: ${new Date(purchase.date).toLocaleDateString("pt-BR")}\n\n🍷 Itens:\n${itemsList}\n\n💰 Total: R$ ${purchase.totalValue.toFixed(2).replace(".", ",")}`,
      [
        { text: "Fechar", style: "cancel" },
        { text: "Enviar Nota Fiscal", onPress: () => console.log("Enviando nota fiscal...") },
      ],
    )
  }

  const PurchaseRow = ({ purchase }) => (
    <View style={styles.tableRow}>
      <View style={styles.nameColumn}>
        <Text style={styles.buyerName}>{purchase.buyerName}</Text>
        <Text style={styles.purchaseDate}>{new Date(purchase.date).toLocaleDateString("pt-BR")}</Text>
      </View>
      <View style={styles.valueColumn}>
        <Text style={styles.purchaseValue}>R$ {purchase.totalValue.toFixed(2).replace(".", ",")}</Text>
      </View>
      <View style={styles.actionColumn}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => showPurchaseDetails(purchase)}>
          <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Análise de Vendas</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Filtros de Período */}
      <View style={styles.periodFilter}>
        {["week", "month", "quarter", "year"].map((period) => (
          <TouchableOpacity
            key={period}
            style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === period && styles.periodButtonTextActive]}>
              {period === "week" ? "Semana" : period === "month" ? "Mês" : period === "quarter" ? "Trimestre" : "Ano"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cards de Estatísticas - apenas 2 cards */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Receita Total"
            value={`R$ ${salesData.totalRevenue.toFixed(2).replace(".", ",")}`}
            subtitle="+12% vs mês anterior"
            icon={DollarSign}
            color="#059669"
          />
          <StatCard
            title="Total de Pedidos"
            value={salesData.totalOrders.toString()}
            subtitle="+8% vs mês anterior"
            icon={ShoppingCart}
            color="#2563EB"
          />
        </View>

        {/* Tabela de Compradores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Compras</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.nameColumn]}>Comprador</Text>
            <Text style={[styles.tableHeaderText, styles.valueColumn]}>Valor</Text>
            <Text style={[styles.tableHeaderText, styles.actionColumn]}>Ação</Text>
          </View>
          {purchaseData.map((purchase) => (
            <PurchaseRow key={purchase.id} purchase={purchase} />
          ))}
        </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  filterButton: {
    padding: 8,
  },
  periodFilter: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#F3F4F6",
  },
  periodButtonActive: {
    backgroundColor: "#2563EB",
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  periodButtonTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statTitle: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: "#059669",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },
  nameColumn: {
    flex: 2,
  },
  valueColumn: {
    flex: 1,
    alignItems: "center",
  },
  actionColumn: {
    flex: 1,
    alignItems: "center",
  },
  buyerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  purchaseDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  purchaseValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
  },
  detailsButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
})
