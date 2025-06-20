import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import { useLoginController } from './Login.controller';
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';

 // 

export default function Login() {
  const {
    document,
    password,
    setDocument,
    setPassword,
    handleLogin,
    handleCreateAccount,
    dialogVisible,
    dialogMessage,
    setDialogVisible,
  } = useLoginController();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Smoker & Beer</Text>

        <TextInput
          style={styles.input}
          placeholder="Documento"
          keyboardType="numeric"
          autoCapitalize="none"
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.createAccountButton]}
          onPress={handleCreateAccount}
        >
          <Text style={[styles.buttonText, styles.createAccountText]}>
            Criar Conta
          </Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Aviso</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
    
  );
}
