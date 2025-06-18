import React, { memo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { DollarSign, ShoppingCart } from 'lucide-react-native';
import { styles } from './styles';
import { usePurchaseAnalyticsController, Purchase } from './Purchase.controller';

const StatCard = memo(
  ({ title, value, icon: Icon, color = '#2563EB' }: { title: string; value: string; icon: any; color?: string }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>  
          <Icon size={24} color={color} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  )
);

const PurchaseRow = memo(({ purchase }: { purchase: Purchase }) => (
  <View style={styles.tableRow}>
    <View style={styles.nameColumn}>
      <Text style={styles.buyerName}>{purchase.username}</Text>
    </View>
    <View style={styles.valueColumn}>
      <Text style={styles.purchaseValue}>
        {`R$ ${Number(purchase.totalPrice).toFixed(2).replace('.', ',')}`}
      </Text>
    </View>
    <View style={styles.actionColumn}>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => showPurchaseDetails(purchase)}
      >
        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  </View>
));

const showPurchaseDetails = (purchase: Purchase) => {
  const itemsList = purchase.items
    .map(
      (item) => `• ${item.wineId} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
    )
    .join('\n');

  Alert.alert(
    `Detalhes da Compra - ${purchase.username}`,
    `📅 Data: ${new Date(purchase.createdAt).toLocaleDateString('pt-BR')}\n\n🍷 Itens:\n${itemsList}\n\n💰 Total: R$ ${Number(purchase.totalPrice).toFixed(2).replace('.', ',')}`,
    [{ text: 'Fechar', style: 'cancel' }]
  );
};

export default function PurchaseAnalytics() {
  const { salesData, purchaseData, loading } = usePurchaseAnalyticsController();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <StatCard
            title="Receita Total"
            value={`R$ ${salesData.totalRevenue.toFixed(2).replace('.', ',')}`}
            icon={DollarSign}
            color="#059669"
          />
          <StatCard
            title="Total de Pedidos"
            value={salesData.totalOrders.toString()}
            icon={ShoppingCart}
            color="#2563EB"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Compras</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.nameColumn]}>Comprador</Text>
            <Text style={[styles.tableHeaderText, styles.valueColumn, styles.centerText]}>Valor</Text>
            <Text style={[styles.tableHeaderText, styles.actionColumn, styles.centerText]}>Ação</Text>
          </View>
          {purchaseData.map((purchase) => (
            <PurchaseRow key={purchase.id} purchase={purchase} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}