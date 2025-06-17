import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomDrawer } from './CustomDrawer';
import { useAuth } from '../auth/AuthContext/AuthContext';

import Login from '../views/screens/login/Login';
import Home from '../views/screens/home/Home';
import NewAccount from '../views/screens/NewAccount/NewAccount';
import CartScreen from '../views/screens/Cart/CartScreen';
import WineCRUD from '../views/screens/wine/Wine'; 
import PurchaseAnalytics from '../views/screens/Purchase/PurchaseAnalytics';
import UserProfile from '../views/screens/user/user'; 
import PurchaseHistory from '../views/screens/purchase-history/purchase-history'; // Import if needed

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Catálogos"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Catálogos" component={Home} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="WineCRUD" component={WineCRUD} />
      <Drawer.Screen name="PurchaseAnalytics" component={PurchaseAnalytics} />
      <Drawer.Screen name="UserProfile" component={UserProfile} />
      <Drawer.Screen name="PurchaseHistory" component={PurchaseHistory} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
}

export default function Routes() {
  const { isLoggedIn, login } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name='Login'>
              {() => <Login setIsLoggedIn={login} />}
            </Stack.Screen>
            <Stack.Screen name='NewAccount' component={NewAccount} />
          </>
        ) : (
          <Stack.Screen name='Catalogos' component={DrawerRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
