import { useEffect, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { Plus, Edit3, Trash2, Search, X, Save } from "lucide-react-native";
import {
  CreateWine,
  DeleteWineAPI,
  EditWine,
  getWines,
} from "../../../api/services/wine/wine";

type Wine = {
  id: number;
  name: string;
  productor: string;
  country: string;
  region: string;
  year: number;
  alcoholContent: number;
  typeGrape: string;
  description: string;
  price: number;
};

export default function WineCRUD() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    productor: "",
    country: "",
    region: "",
    year: "",
    alcoholContent: "",
    typeGrape: "",
    description: "",
    price: "",
  });

  const carregarVinhos = async () => {
    try {
      const dados: Wine[] = await getWines();
      setWines(dados);
    } catch (error) {
      console.error("Erro ao carregar vinhos:", error);
      Alert.alert("Erro", "Não foi possível carregar os vinhos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVinhos();
  }, []);

  const filteredWines = wines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.typeGrape.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      productor: "",
      country: "",
      region: "",
      year: "",
      alcoholContent: "",
      typeGrape: "",
      description: "",
      price: "",
    });
    setEditingWine(null);
  };

  const openModal = (wine: Wine | null = null) => {
    if (wine) {
      setEditingWine(wine);
      setFormData({
        name: wine.name,
        productor: wine.productor,
        country: wine.country,
        region: wine.region,
        year: wine.year.toString(),
        alcoholContent: wine.alcoholContent.toString(),
        typeGrape: wine.typeGrape,
        description: wine.description,
        price: wine.price.toString(),
      });
    } else {
      resetForm();
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetForm();
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "productor",
      "country",
      "region",
      "year",
      "alcoholContent",
      "typeGrape",
      "description",
      "price",
    ];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData].trim()) {
        Alert.alert("Erro", `Campo "${field}" é obrigatório`);
        return false;
      }
    }
    if (isNaN(Number(formData.price))) {
      Alert.alert("Erro", "Preço deve ser um número válido");
      return false;
    }
    return true;
  };

  const saveWine = async () => {
    if (!validateForm()) return;

    const wineData: Wine = {
      id: editingWine?.id || 0, // Se for um novo vinho, o ID será 0
      name: formData.name.trim(),
      productor: formData.productor.trim(),
      country: formData.country.trim(),
      region: formData.region.trim(),
      year: Number(formData.year) || 0,
      alcoholContent: parseFloat(formData.alcoholContent),
      typeGrape: formData.typeGrape.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
    };

    if (editingWine) {
      console.log("Atualizando vinho:", editingWine);
      EditWine(editingWine.id!, wineData);
      await carregarVinhos();
      Alert.alert("Sucesso", "Vinho atualizado com sucesso!");
    } else {
      await CreateWine(wineData);
      console.log("Criando novo vinho:", wineData);
      closeModal();
      await carregarVinhos();
      Alert.alert("Sucesso", "Vinho adicionado com sucesso!");
    }

    closeModal();
  };

  const deleteWine = (wine: Wine) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir "${wine.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await DeleteWineAPI(wine.id); // <- importante mudar o nome aqui para não colidir
              await carregarVinhos();
              Alert.alert("Sucesso", "Vinho excluído com sucesso!");
            } catch (error) {
              Alert.alert("Erro", "Erro ao excluir vinho.");
            }
          },
        },
      ]
    );
  };

  const WineItem = ({ wine }: { wine: Wine }) => (
    <View style={styles.wineItem}>
      <View style={styles.wineInfo}>
        <Text style={styles.wineName}>{wine.name}</Text>
        <Text style={styles.wineDetails}>
          {wine.typeGrape} • {wine.year}
        </Text>
        <Text style={styles.wineRegion}>{wine.region}</Text>
        <View style={styles.wineStats}>
          <Text style={styles.winePrice}>R$ {wine.price}</Text>
        </View>
      </View>

      <View style={styles.wineActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => openModal(wine)}
        >
          <Edit3 size={16} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteWine(wine)}
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const FormInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: any;
  }) => (
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
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingWine ? "Editar Vinho" : "Novo Vinho"}
            </Text>
            <TouchableOpacity onPress={saveWine}>
              <Save size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            <FormInput
              label="Nome"
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              placeholder="Ex: Merlot"
            />
            <FormInput
              label="Produtor"
              value={formData.productor}
              onChangeText={(text) =>
                setFormData({ ...formData, productor: text })
              }
              placeholder="Ex: Aurora"
            />
            <FormInput
              label="País"
              value={formData.country}
              onChangeText={(text) =>
                setFormData({ ...formData, country: text })
              }
              placeholder="Ex: Brasil"
            />
            <FormInput
              label="Região"
              value={formData.region}
              onChangeText={(text) =>
                setFormData({ ...formData, region: text })
              }
              placeholder="Ex: Serra Gaúcha"
            />
            <FormInput
              label="Ano"
              value={formData.year}
              onChangeText={(text) => setFormData({ ...formData, year: text })}
              placeholder="Ex: 2021"
              keyboardType="numeric"
            />
            <FormInput
              label="Álcool (%)"
              value={formData.alcoholContent}
              onChangeText={(text) =>
                setFormData({ ...formData, alcoholContent: text })
              }
              placeholder="Ex: 13.5"
              keyboardType="decimal-pad"
            />
            <FormInput
              label="Tipo de Uva"
              value={formData.typeGrape}
              onChangeText={(text) =>
                setFormData({ ...formData, typeGrape: text })
              }
              placeholder="Ex: Cabernet Sauvignon"
            />
            <FormInput
              label="Descrição"
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              placeholder="Notas frutadas..."
            />
            <FormInput
              label="Preço (R$)"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              placeholder="Ex: 89.90"
              keyboardType="decimal-pad"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
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
});
