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
  } = usePurchaseHistoryController();

  const PurchaseCard = ({ purchase }: { purchase: any }) => (
    <TouchableOpacity
      style={styles.purchaseCard}
      activeOpacity={0.8}
      onPress={() => {}}
    >
      <View style={styles.purchaseHeader}>
        <View>
          <Text style={styles.purchaseId}>Pedido {purchase.id}</Text>
          <Text style={styles.purchaseDate}>{purchase.createdAtFormatted}</Text>
        </View>
      </View>

      <View style={styles.purchaseFooter}>
        <Text style={styles.totalLabel}>Total: </Text>
        <Text style={styles.totalValue}>R$ {purchase.totalPrice}</Text>
        <View style={styles.actionButtons}></View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico de Compras</Text>
      </View>

      {showFilterMenu && (
        <View style={styles.filterMenu}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.filterOption,
                selectedFilter === option.key && styles.filterOptionActive,
              ]}
              onPress={() => selectFilter(option.key)}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedFilter === option.key &&
                    styles.filterOptionTextActive,
                ]}
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
                  R$ {purchaseHistory.reduce((sum, p) => sum + Number(p.totalPrice), 0).toFixed(2)}
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
          filteredPurchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Package size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>Nenhuma compra encontrada</Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedFilter === "all"
                ? "Você ainda não fez nenhuma compra"
                : "Nenhuma compra com este status"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}