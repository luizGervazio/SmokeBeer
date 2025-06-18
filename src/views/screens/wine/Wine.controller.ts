// wine/Wine.controller.ts – revisado para evitar re‑renders que fecham o teclado
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

const EMPTY_FORM = {
  name: "",
  productor: "",
  country: "",
  region: "",
  year: "",
  alcoholContent: "",
  typeGrape: "",
  description: "",
  price: "",
};

export function useWineController() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  /* ---------------- CARREGAR VINHOS ---------------- */
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

  /* ---------------- SINCRONIZAR FORMULÁRIO QUANDO O MODAL ABRE ---------------- */
  useEffect(() => {
    if (modalVisible) {
      // Se estamos editando, carrega dados do vinho uma única vez
      if (editingWine) {
        setFormData((prev) =>
          prev.id === editingWine.id
            ? prev // já configurado – evita re‑render desnecessário
            : {
                name: editingWine.name,
                productor: editingWine.productor,
                country: editingWine.country,
                region: editingWine.region,
                year: editingWine.year.toString(),
                alcoholContent: editingWine.alcoholContent.toString(),
                typeGrape: editingWine.typeGrape,
                description: editingWine.description,
                price: editingWine.price.toString(),
              }
        );
      } else {
        // Novo vinho → limpa apenas se necessário
        if (Object.values(formData).some((v) => v !== "")) {
          setFormData({ ...EMPTY_FORM });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  /* ---------------- FUNÇÕES DE ABRIR/FECHAR ---------------- */
  const openModal = (wine: Wine | null = null) => {
    setEditingWine(wine);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingWine(null);
  };

  /* ---------------- VALIDAÇÃO ---------------- */
  const validateForm = () => {
    const required = [
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
    for (const field of required) {
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

  /* ---------------- SALVAR ---------------- */
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

    try {
      if (editingWine) {
        await EditWine(editingWine.id, wineData);
        Alert.alert("Sucesso", "Vinho atualizado com sucesso!");
      } else {
        await CreateWine(wineData);
        Alert.alert("Sucesso", "Vinho adicionado com sucesso!");
      }
      await carregarVinhos();
      closeModal();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar o vinho.");
    }
  };

  /* ---------------- EXCLUIR ---------------- */
  const deleteWine = (wine: Wine) => {
    Alert.alert("Confirmar Exclusão", `Deseja excluir \"${wine.name}\"?`, [
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

  /* ---------------- FILTRO ---------------- */
  const filteredWines = wines.filter((wine) => {
    const term = searchTerm.toLowerCase();
    return (
      wine.name.toLowerCase().includes(term) ||
      wine.typeGrape.toLowerCase().includes(term) ||
      wine.region.toLowerCase().includes(term)
    );
  });

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
