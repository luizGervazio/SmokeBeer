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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="WineCRUD" component={WineCRUD} />
      <Drawer.Screen name="PurchaseAnalytics" component={PurchaseAnalytics} />
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
          <Stack.Screen name='Home' component={DrawerRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
