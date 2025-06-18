import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useAuth } from '../auth/AuthContext/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

export function CustomDrawer(props: any) {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Sair"
          onPress={logout}
          labelStyle={styles.logoutLabel}
          icon={() => <MaterialIcons name="logout" size={22} color="#EF4444" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    },
  logoutLabel: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
});
