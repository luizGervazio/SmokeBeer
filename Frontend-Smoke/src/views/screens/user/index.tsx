import React, { memo } from 'react';
import {
  TextInput,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Edit3,
  Camera,
  Save,
  X,
  User,
  FileText,
  Phone,
  MapPin,
  LogOut,
} from 'lucide-react-native';
import { styles } from './styles';
import { useUserController } from './User.controller';

/* ---------- FIELD COMPONENT MEMORIZADO ---------- */
const ProfileField = memo(
  ({
    icon: Icon,
    label,
    value,
    onChangeText,
    editable = true,
    keyboardType = 'default',
    isEditing,
  }: {
    icon: any;
    label: string;
    value: string;
    onChangeText: (t: string) => void;
    editable?: boolean;
    keyboardType?: any;
    isEditing: boolean;
  }) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Icon size={20} color="#6B7280" />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <TextInput
        style={[
          styles.fieldInput,
          !isEditing && { color: '#9CA3AF' },
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={isEditing && editable}
        multiline={label === 'Bio'}
        numberOfLines={label === 'Bio' ? 3 : 1}
        placeholder={label}
        blurOnSubmit={false}
      />
    </View>
  )
);

export default function UserProfile() {
  const {
    isEditing,
    editedInfo,
    userInfo,
    setEditedInfo,
    handleSave,
    handleCancel,
    handleImagePicker,
    handleLogout,
    setIsEditing,
  } = useUserController();

  const updateField =
    (field: keyof typeof editedInfo) => (value: string) =>
      setEditedInfo(prev => ({ ...prev, [field]: value }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (
            <Save size={24} color="#059669" />
          ) : (
            <Edit3 size={24} color="#2563EB" />
          )}
        </TouchableOpacity>
      </View>

      {/* Mantém teclado ao tocar fora (especialmente no Android) */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        {/* Foto e nome */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: userInfo.profileImage }}
              style={styles.profileImage}
            />
            {isEditing && (
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleImagePicker}
              >
                <Camera size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.userName}>
            {isEditing ? editedInfo.name : userInfo.name}
          </Text>
          <Text style={styles.userEmail}>{editedInfo.document}</Text>
        </View>

        {/* Campos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <ProfileField
            icon={User}
            label="Nome Completo"
            value={editedInfo.name}
            onChangeText={updateField('name')}
            isEditing={isEditing}
          />

          <ProfileField
            icon={FileText}
            label="Documento"
            value={editedInfo.document}
            onChangeText={updateField('document')}
            keyboardType="numeric"
            isEditing={isEditing}
          />

          <ProfileField
            icon={Phone}
            label="Telefone"
            value={editedInfo.phone}
            onChangeText={updateField('phone')}
            keyboardType="phone-pad"
            isEditing={isEditing}
          />

          <ProfileField
            icon={MapPin}
            label="Localização"
            value={editedInfo.localization}
            onChangeText={updateField('localization')}
            isEditing={isEditing}
          />
        </View>

        {/* Botões */}
        {isEditing ? (
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
        ) : (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
