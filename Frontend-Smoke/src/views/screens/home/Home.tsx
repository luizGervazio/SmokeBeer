import { useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from "react-native"
import { ShoppingCart } from "lucide-react-native"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  // Dados de exemplo dos vinhos
  const wines = [
    {
      id: 1,
      name: "Chanceler Reserva",
      type: "Tinto Seco",
      year: "2020",
      region: "Serra Gaúcha",
      price: "R$ 89,90",
      rating: 4.5,
      image: "https://via.placeholder.com/120x200/8B5CF6/FFFFFF?text=Vinho",
    },
    {
      id: 2,
      name: "Miolo Lote 43",
      type: "Tinto Suave",
      year: "2019",
      region: "Vale dos Vinhedos",
      price: "R$ 125,00",
      rating: 4.8,
      image: "https://via.placeholder.com/120x200/DC2626/FFFFFF?text=Vinho",
    },
    {
      id: 3,
      name: "Casa Valduga Branco",
      type: "Branco Seco",
      year: "2021",
      region: "Bento Gonçalves",
      price: "R$ 65,50",
      rating: 4.2,
      image: "https://via.placeholder.com/120x200/F59E0B/FFFFFF?text=Vinho",
    },
  ]

  // Filtrar vinhos baseado na busca
  const filteredWines = wines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )


  const handleAddToCart = (wine: any) => {
    Alert.alert("Adicionado ao Carrinho! 🛒", `${wine.name} foi adicionado ao seu carrinho.\n\nPreço: ${wine.price}`, [
      { text: "Continuar Comprando", style: "cancel" },
      { text: "Ver Carrinho", onPress: () => console.log("Navegar para carrinho") },
    ])
  }

  const WineCard = ({ wine }: { wine: any }) => (
    <TouchableOpacity style={styles.wineCard} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: wine.image }} style={styles.wineImage} resizeMode="cover" />
      </View>

      <View style={styles.wineDetails}>
        <Text style={styles.wineName}>{wine.name}</Text>
        <Text style={styles.wineType}>
          {wine.type} • {wine.year}
        </Text>
        <Text style={styles.wineRegion}>{wine.region}</Text>

        <View style={styles.priceAndCartContainer}>
          <Text style={styles.winePrice}>{wine.price}</Text>
          <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(wine)} activeOpacity={0.7}>
            <ShoppingCart size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

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
            <Text style={styles.emptyStateSubtext}>Tente buscar por outro termo</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchInput: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#111827",
  },
  winesList: {
    flex: 1,
  },
  winesListContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  wineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  imageContainer: {
    width: 80,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
    marginRight: 16,
  },
  wineImage: {
    width: "100%",
    height: "100%",
  },
  wineDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  wineName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  wineType: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  wineRegion: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  winePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
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
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  priceAndCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
})