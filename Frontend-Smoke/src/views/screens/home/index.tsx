"use client";

import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ShoppingCart } from "lucide-react-native";
import { styles } from "./styles";
import { useHomeController } from "./home.controller";
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';


export default function Home() {
  const {
    searchTerm,
    setSearchTerm,
    filteredWines,
    handleAddToCart,
    loading,
    dialogVisible,
    dialogMessage,
    setDialogVisible,
  } = useHomeController();

  const WineCard = ({ wine }: { wine: any }) => (
    <TouchableOpacity style={styles.wineCard} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: wine.image }}
          style={styles.wineImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.wineDetails}>
        <Text style={styles.wineName}>{wine.name}</Text>
        <Text style={styles.wineType}>
          {wine.typeGrape} • {wine.year}
        </Text>
        <Text style={styles.wineRegion}>{wine.region}</Text>

        <View style={styles.priceAndCartContainer}>
          <Text style={styles.winePrice}>R$ {wine.price}</Text>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => handleAddToCart(wine)}
            activeOpacity={0.7}
          >
            <ShoppingCart size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Encontre o vinho perfeito</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar vinhos, tipos ou regiões..."
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#6B21A8" />
        </View>
      ) : (
        <ScrollView
          style={styles.winesList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.winesListContent}
        >
          {filteredWines.length > 0 ? (
            filteredWines.map((wine) => <WineCard key={wine.id} wine={wine} />)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Nenhum vinho encontrado</Text>
              <Text style={styles.emptyStateSubtext}>
                Tente buscar por outro termo
              </Text>
            </View>
          )}
        </ScrollView>
      )}
      
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Mensagem</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}