"use client"

import { useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Switch,
} from "react-native"
import {
  ArrowLeft,
  Edit3,
  Camera,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Bell,
  Shield,
  LogOut,
} from "lucide-react-native"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // Dados do usuário
  const [userInfo, setUserInfo] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    birthDate: "15/03/1985",
    address: "São Paulo, SP",
    bio: "Apaixonado por vinhos e sempre em busca de novas experiências gastronômicas.",
    profileImage: "/placeholder.svg?height=120&width=120",
  })

  const [editedInfo, setEditedInfo] = useState(userInfo)

  const handleSave = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!")
  }

  const handleCancel = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  const handleImagePicker = () => {
    Alert.alert("Alterar Foto", "Escolha uma opção:", [
      { text: "Cancelar", style: "cancel" },
      { text: "Câmera", onPress: () => console.log("Abrir câmera") },
      { text: "Galeria", onPress: () => console.log("Abrir galeria") },
    ])
  }

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: () => console.log("Logout") },
    ])
  }

  const ProfileField = ({ icon: Icon, label, value, onChangeText, editable = true, keyboardType = "default" }) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Icon size={20} color="#6B7280" />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {isEditing && editable ? (
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={label === "Bio"}
          numberOfLines={label === "Bio" ? 3 : 1}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? <Save size={24} color="#059669" /> : <Edit3 size={24} color="#2563EB" />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
            {isEditing && (
              <TouchableOpacity style={styles.cameraButton} onPress={handleImagePicker}>
                <Camera size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.userName}>{isEditing ? editedInfo.name : userInfo.name}</Text>
          <Text style={styles.userEmail}>{isEditing ? editedInfo.email : userInfo.email}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <ProfileField
            icon={User}
            label="Nome Completo"
            value={editedInfo.name}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, name: text })}
          />

          <ProfileField
            icon={Mail}
            label="E-mail"
            value={editedInfo.email}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, email: text })}
            keyboardType="email-address"
          />

          <ProfileField
            icon={Phone}
            label="Telefone"
            value={editedInfo.phone}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, phone: text })}
            keyboardType="phone-pad"
          />

          <ProfileField
            icon={Calendar}
            label="Data de Nascimento"
            value={editedInfo.birthDate}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, birthDate: text })}
            editable={false}
          />

          <ProfileField
            icon={MapPin}
            label="Localização"
            value={editedInfo.address}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, address: text })}
          />

        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Privacidade e Segurança</Text>
            </View>
            <ArrowLeft size={16} color="#9CA3AF" style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <X size={20} color="#EF4444" />
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button */}
        {!isEditing && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileImageSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563EB",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#6B7280",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: "#111827",
    paddingLeft: 28,
  },
  fieldInput: {
    fontSize: 16,
    color: "#111827",
    paddingLeft: 28,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF4444",
    backgroundColor: "#FFFFFF",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
    marginLeft: 8,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#059669",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF4444",
    backgroundColor: "#FFFFFF",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
    marginLeft: 8,
  },
})
