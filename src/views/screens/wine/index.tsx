import React, { memo } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Plus, Edit3, Trash2, Search, X, Save } from "lucide-react-native";
import { styles } from "./styles";
import { useWineController } from "./Wine.controller";

/* ---------- COMPONENTE MEMOIZADO PARA CAMPOS ---------- */
const WineField = memo(
  ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
  }: {
    label: string;
    value: string;
    onChangeText: (t: string) => void;
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
        blurOnSubmit={false}
      />
    </View>
  )
);

export default function WineCRUD() {
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

  /* ---------- ITEM DA LISTA ---------- */
  const WineItem = ({ wine }: { wine: any }) => (
    <View style={styles.wineItem}>
      <View style={styles.wineInfo}>
        <Text style={styles.wineName}>{wine.name}</Text>
        <Text style={styles.wineDetails}>
          {wine.typeGrape} • {wine.year}
        </Text>
        <Text style={styles.wineRegion}>{wine.region}</Text>
        <View style={styles.wineStats}>
          <Text style={styles.winePrice}>
            R$ {!isNaN(Number(wine.price)) ? Number(wine.price).toFixed(2) : "0.00"}
          </Text>
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
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gerenciar Vinhos</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* ---------- BARRA DE BUSCA ---------- */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar vinhos..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9CA3AF"
            blurOnSubmit={false}
          />
        </View>
      </View>

      {/* ---------- LISTA ---------- */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredWines.length > 0 ? (
          filteredWines.map((wine) => <WineItem key={wine.id} wine={wine} />)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum vinho encontrado</Text>
          </View>
        )}
      </ScrollView>

      {/* ---------- MODAL ---------- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingWine ? "Editar Vinho" : "Novo Vinho"}
            </Text>
            <TouchableOpacity
              onPress={async () => {
                await saveWine();
                closeModal();
              }}
            >
              <Save size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          >
            <ScrollView
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <WineField
                label="Nome"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
                placeholder="Ex: Merlot"
              />
              <WineField
                label="Produtor"
                value={formData.productor}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, productor: text }))
                }
                placeholder="Ex: Aurora"
              />
              <WineField
                label="País"
                value={formData.country}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, country: text }))
                }
                placeholder="Ex: Brasil"
              />
              <WineField
                label="Região"
                value={formData.region}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, region: text }))
                }
                placeholder="Ex: Serra Gaúcha"
              />
              <WineField
                label="Ano"
                value={formData.year}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, year: text }))
                }
                placeholder="Ex: 2021"
                keyboardType="numeric"
              />
              <WineField
                label="Álcool (%)"
                value={formData.alcoholContent}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, alcoholContent: text }))
                }
                placeholder="Ex: 13.5"
                keyboardType="decimal-pad"
              />
              <WineField
                label="Tipo de Uva"
                value={formData.typeGrape}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, typeGrape: text }))
                }
                placeholder="Ex: Cabernet Sauvignon"
              />
              <WineField
                label="Descrição"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, description: text }))
                }
                placeholder="Notas frutadas..."
              />
              <WineField
                label="Preço (R$)"
                value={formData.price}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, price: text }))
                }
                placeholder="Ex: 89.90"
                keyboardType="decimal-pad"
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
