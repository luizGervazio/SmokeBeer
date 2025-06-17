import React, { memo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { styles } from './styles';
import { useHomeController, Wine } from './home.controller';

const WineCard = memo(({ wine, onAdd }: { wine: Wine; onAdd: (w: Wine) => void }) => (
  <TouchableOpacity style={styles.wineCard} activeOpacity={0.8}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: wine.image }} style={styles.wineImage} resizeMode="cover" />
    </View>
    <View style={styles.wineDetails}>
      <Text style={styles.wineName}>{wine.name}</Text>
      <Text style={styles.wineType}>{`${wine.typeGrape} • ${wine.year}`}</Text>
      <Text style={styles.wineRegion}>{wine.region}</Text>
      <View style={styles.priceAndCartContainer}>
        <Text style={styles.winePrice}>{wine.price}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => onAdd(wine)}>
          <ShoppingCart size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
));

export default function HomeScreen() {
  const {
    searchTerm,
    setSearchTerm,
    loading,
    filteredWines,
    handleAddToCart,
  } = useHomeController();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Encontre o vinho perfeito</Text>
      </View>

      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar vinhos, tipos ou regiões..."
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCapitalize="none"
          blurOnSubmit={false}
        />
      </View>

      {/* Lista de vinhos */}
      <ScrollView
        style={styles.winesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.winesListContent}
      >
        {filteredWines.length > 0 ? (
          filteredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} onAdd={handleAddToCart} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhum vinho encontrado</Text>
            <Text style={styles.emptyStateSubtext}>
              Tente buscar por outro termo
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
