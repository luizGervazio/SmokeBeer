import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Plus, Edit3, Trash2, Search, X, Save } from "lucide-react-native";
import { styles } from "./styles";
import { useWineController } from "./Wine.controller";

const WineCRUD = () => {
  const {
    wines,
    loading,
    searchTerm,
    setSearchTerm,
    modalVisible,
    openModal,
    closeModal,
    editingWine,
    formData,
    setFormData,
    saveWine,
    deleteWine,
    filteredWines,
  } = useWineController();

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

  const WineItem = ({ wine }: { wine: any }) => (
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
              onChangeText={(text) =>
                setFormData({ ...formData, year: text })
              }
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
              onChangeText={(text) =>
                setFormData({ ...formData, price: text })
              }
              placeholder="Ex: 89.90"
              keyboardType="decimal-pad"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default WineCRUD;
