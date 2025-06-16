"use client"

import { useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native"
import { Plus, Edit3, Trash2, Search, X, Save } from "lucide-react-native"

export default function WineCRUD() {
  const [wines, setWines] = useState([
    {
      id: 1,
      name: "Chanceler Reserva",
      type: "Tinto Seco",
      year: "2020",
      region: "Serra Gaúcha",
      price: 89.9,
      rating: 4.5,
      stock: 25,
    },
    {
      id: 2,
      name: "Miolo Lote 43",
      type: "Tinto Suave",
      year: "2019",
      region: "Vale dos Vinhedos",
      price: 125.0,
      rating: 4.8,
      stock: 15,
    },
    {
      id: 3,
      name: "Casa Valduga Branco",
      type: "Branco Seco",
      year: "2021",
      region: "Bento Gonçalves",
      price: 65.5,
      rating: 4.2,
      stock: 30,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [editingWine, setEditingWine] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    year: "",
    region: "",
    price: "",
    rating: "",
    stock: "",
  })

  const filteredWines = wines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      year: "",
      region: "",
      price: "",
      rating: "",
      stock: "",
    })
    setEditingWine(null)
  }

  const openModal = (wine = null) => {
    if (wine) {
      setEditingWine(wine)
      setFormData({
        name: wine.name,
        type: wine.type,
        year: wine.year,
        region: wine.region,
        price: wine.price.toString(),
        rating: wine.rating.toString(),
        stock: wine.stock.toString(),
      })
    } else {
      resetForm()
    }
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    resetForm()
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Erro", "Nome é obrigatório")
      return false
    }
    if (!formData.type.trim()) {
      Alert.alert("Erro", "Tipo é obrigatório")
      return false
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      Alert.alert("Erro", "Preço deve ser um número válido")
      return false
    }
    return true
  }

  const saveWine = () => {
    if (!validateForm()) return

    const wineData = {
      name: formData.name.trim(),
      type: formData.type.trim(),
      year: formData.year.trim(),
      region: formData.region.trim(),
      price: Number.parseFloat(formData.price),
      rating: Number.parseFloat(formData.rating) || 0,
      stock: Number.parseInt(formData.stock) || 0,
    }

    if (editingWine) {
      // Editar vinho existente
      setWines((prevWines) => prevWines.map((wine) => (wine.id === editingWine.id ? { ...wine, ...wineData } : wine)))
      Alert.alert("Sucesso", "Vinho atualizado com sucesso!")
    } else {
      // Adicionar novo vinho
      const newWine = {
        id: Date.now(),
        ...wineData,
      }
      setWines((prevWines) => [...prevWines, newWine])
      Alert.alert("Sucesso", "Vinho adicionado com sucesso!")
    }

    closeModal()
  }

  const deleteWine = (wine) => {
    Alert.alert("Confirmar Exclusão", `Tem certeza que deseja excluir "${wine.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setWines((prevWines) => prevWines.filter((w) => w.id !== wine.id))
          Alert.alert("Sucesso", "Vinho excluído com sucesso!")
        },
      },
    ])
  }

  const WineItem = ({ wine }) => (
    <View style={styles.wineItem}>
      <View style={styles.wineInfo}>
        <Text style={styles.wineName}>{wine.name}</Text>
        <Text style={styles.wineDetails}>
          {wine.type} • {wine.year}
        </Text>
        <Text style={styles.wineRegion}>{wine.region}</Text>
        <View style={styles.wineStats}>
          <Text style={styles.winePrice}>R$ {wine.price.toFixed(2).replace(".", ",")}</Text>
          <Text style={styles.wineStock}>Estoque: {wine.stock}</Text>
          <Text style={styles.wineRating}>⭐ {wine.rating}</Text>
        </View>
      </View>

      <View style={styles.wineActions}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => openModal(wine)}>
          <Edit3 size={16} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => deleteWine(wine)}>
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  )

  const FormInput = ({ label, value, onChangeText, placeholder, keyboardType = "default" }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gerenciar Vinhos</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar vinhos..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredWines.length > 0 ? (
          filteredWines.map((wine) => <WineItem key={wine.id} wine={wine} />)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum vinho encontrado</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal de Formulário */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{editingWine ? "Editar Vinho" : "Novo Vinho"}</Text>
            <TouchableOpacity onPress={saveWine}>
              <Save size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <FormInput
              label="Nome do Vinho"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Ex: Chanceler Reserva"
            />

            <FormInput
              label="Tipo"
              value={formData.type}
              onChangeText={(text) => setFormData({ ...formData, type: text })}
              placeholder="Ex: Tinto Seco"
            />

            <FormInput
              label="Ano"
              value={formData.year}
              onChangeText={(text) => setFormData({ ...formData, year: text })}
              placeholder="Ex: 2020"
              keyboardType="numeric"
            />

            <FormInput
              label="Região"
              value={formData.region}
              onChangeText={(text) => setFormData({ ...formData, region: text })}
              placeholder="Ex: Serra Gaúcha"
            />

            <FormInput
              label="Preço (R$)"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              placeholder="Ex: 89.90"
              keyboardType="decimal-pad"
            />

            <FormInput
              label="Avaliação (0-5)"
              value={formData.rating}
              onChangeText={(text) => setFormData({ ...formData, rating: text })}
              placeholder="Ex: 4.5"
              keyboardType="decimal-pad"
            />

            <FormInput
              label="Estoque"
              value={formData.stock}
              onChangeText={(text) => setFormData({ ...formData, stock: text })}
              placeholder="Ex: 25"
              keyboardType="numeric"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  addButton: {
    backgroundColor: "#2563EB",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  wineItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  wineInfo: {
    flex: 1,
  },
  wineName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  wineDetails: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  wineRegion: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  wineStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  winePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
  },
  wineStock: {
    fontSize: 14,
    color: "#6B7280",
  },
  wineRating: {
    fontSize: 14,
    color: "#F59E0B",
  },
  wineActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#EBF4FF",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#111827",
  },
})
