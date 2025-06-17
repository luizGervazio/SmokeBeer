import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  CreateWine,
  DeleteWineAPI,
  EditWine,
  getWines,
} from "../../../api/services/wine/wine";

export type Wine = {
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

export function useWineController() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
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
      const dados = await getWines();
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
      id: editingWine?.id || 0,
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
      await EditWine(editingWine.id!, wineData);
      Alert.alert("Sucesso", "Vinho atualizado com sucesso!");
    } else {
      await CreateWine(wineData);
      Alert.alert("Sucesso", "Vinho adicionado com sucesso!");
    }

    await carregarVinhos();
    closeModal();
  };

  const deleteWine = (wine: Wine) => {
    Alert.alert("Confirmar Exclusão", `Deseja excluir "${wine.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await DeleteWineAPI(wine.id);
            await carregarVinhos();
            Alert.alert("Sucesso", "Vinho excluído com sucesso!");
          } catch {
            Alert.alert("Erro", "Erro ao excluir vinho.");
          }
        },
      },
    ]);
  };

  const filteredWines = wines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.typeGrape.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
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
  };
}
