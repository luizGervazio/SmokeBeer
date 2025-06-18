import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { useNewAccountController } from "./NewAcconunt.controller";
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';

export default function NewAccount() {
  const {
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
  handleDialogClose, // ✅ usado para fechar o modal
} = useNewAccountController();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Documento"
        keyboardType="numeric"
        value={document}
        onChangeText={setDocument}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localization}
        onChangeText={setLocalization}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goBack}>
        <Text style={styles.backText}>Voltar para login</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={handleDialogClose}>
          <Dialog.Title>Aviso</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDialogClose}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
