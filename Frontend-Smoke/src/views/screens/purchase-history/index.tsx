"use client";

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { ArrowLeft, Filter, Package, Eye } from "lucide-react-native";
import { styles } from "./styles";
import { usePurchaseHistoryController } from "./PurchaseHistory.controller";

export default function PurchaseHistory() {
  const {
    showFilterMenu,
    selectedFilter,
    filteredPurchases,
    purchaseHistory,
    filterOptions,
    toggleFilterMenu,
    selectFilter,
    handleViewDetails,
  } = usePurchaseHistoryController();

  const PurchaseCard = ({ purchase }: { purchase: any }) => (
    <TouchableOpacity style={styles.purchaseCard} activeOpacity={0.8} onPress={() => handleViewDetails(purchase)}>
      <View style={styles.purchaseHeader}>
        <View>
          <Text style={styles.purchaseId}>Pedido {purchase.id}</Text>
          <Text style={styles.purchaseDate}>{new Date(purchase.date).toLocaleDateString("pt-BR")}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {purchase.items.slice(0, 2).map((item: any) => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemType}>{item.type} • Qtd: {item.quantity}</Text>
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Compras</Text>
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterMenu}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {showFilterMenu && (
        <View style={styles.filterMenu}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.filterOption, selectedFilter === option.key && styles.filterOptionActive]}
              onPress={() => selectFilter(option.key)}
            >
              <Text
                style={[styles.filterOptionText, selectedFilter === option.key && styles.filterOptionTextActive]}
              >
                {option.label} ({option.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{purchaseHistory.length}</Text>
          <Text style={styles.summaryLabel}>Total de Pedidos</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            R$ {purchaseHistory.reduce((sum, p) => sum + p.total, 0).toFixed(0)}
          </Text>
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
  );
}