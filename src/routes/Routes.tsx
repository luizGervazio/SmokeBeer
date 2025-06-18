import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomDrawer } from './CustomDrawer';
import { useAuth } from '../auth/AuthContext/AuthContext';

import Login from '../views/screens/login/index';
import Home from '../views/screens/home/index';
import NewAccount from '../views/screens/NewAccount/index';
import CartScreen from '../views/screens/Cart/index';
import WineCRUD from '../views/screens/wine/index';
import PurchaseAnalytics from '../views/screens/Purchase/index';
import UserProfile from '../views/screens/user/index';
import PurchaseHistory from '../views/screens/purchase-history/index';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  const { roles } = useAuth(); // agora usamos roles (array)

  return (
    <Drawer.Navigator
      initialRouteName="Catálogos"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Catálogos" component={Home} />
      <Drawer.Screen name="Carinho" component={CartScreen} />
      <Drawer.Screen name="Usuário" component={UserProfile} />
      <Drawer.Screen name="Histórico de Compra" component={PurchaseHistory} />

      {/* Exibir apenas se for admin */}
      {roles.includes('admin') && (
        <>
          <Drawer.Screen name="Vinhos" component={WineCRUD} />
          <Drawer.Screen name="Análises de Compras" component={PurchaseAnalytics} />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default function Routes() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='NewAccount' component={NewAccount} />
          </>
        ) : (
          <Stack.Screen name='Catalogos' component={DrawerRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
