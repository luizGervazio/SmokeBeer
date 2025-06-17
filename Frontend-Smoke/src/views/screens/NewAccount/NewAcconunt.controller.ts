import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../../api/services/auth/auth"; 

export function useNewAccountController() {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !document || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      await register({ name, document, password });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Erro ao cadastrar. Tente novamente.");
    }
  };

  const goBack = () => navigation.goBack();

  return {
    name,
    document,
    password,
    setName,
    setDocument,
    setPassword,
    handleRegister,
    goBack,
  };
}
