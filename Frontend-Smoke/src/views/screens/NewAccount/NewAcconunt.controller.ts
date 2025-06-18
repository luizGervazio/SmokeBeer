import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../../api/services/auth/auth";

export function useNewAccountController() {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [localization, setLocalization] = useState("");

  const navigation = useNavigation();

  // Estados para o Dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [shouldGoBack, setShouldGoBack] = useState(false); // para redirecionar após sucesso

  const showAlert = (message: string, goBackAfter = false) => {
    setDialogMessage(message);
    setDialogVisible(true);
    setShouldGoBack(goBackAfter);
  };

  const handleRegister = async () => {
    if (!name || !document || !password) {
      showAlert("Preencha todos os campos.");
      return;
    }

    try {
      await register({ name, document, password, phone, localization });
      showAlert("Conta criada com sucesso!", true); // mostra e depois volta
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      showAlert("Erro ao cadastrar. Tente novamente.");
    }
  };

  const goBack = () => navigation.goBack();

  const handleDialogClose = () => {
    setDialogVisible(false);
    if (shouldGoBack) goBack();
  };

  return {
    name,
    document,
    password,
    phone,
    localization,
    setName,
    setDocument,
    setPassword,
    setPhone,
    setLocalization,
    handleRegister,
    goBack,
    dialogVisible,
    dialogMessage,
    handleDialogClose,
  };
}
