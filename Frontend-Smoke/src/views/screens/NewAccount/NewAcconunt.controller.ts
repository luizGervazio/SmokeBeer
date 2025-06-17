import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../../api/services/auth/auth"; 

export function useNewAccountController() {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Placeholder for phone, not used in this context
  const [localization, setLocalization] = useState(""); // Placeholder for localization, not used in this context
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !document || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      await register({ name, document, password, phone, localization });
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
    phone, // Placeholder for phone, not used in this context
    localization, // Placeholder for localization, not used in this context
    setPhone, // Placeholder for phone, not used in this context
    setLocalization,
    setName,
    setDocument,
    setPassword,
    handleRegister,
    goBack,
  };
}
