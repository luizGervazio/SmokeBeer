import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../views/screens/login/Login';
import Home from '../views/screens/home/Home';
import NewAccount from '../views/screens/NewAccount/NewAccount';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name='Home' component={Home} />
    </Drawer.Navigator>
  );
}

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name='Login'>
              {() => <Login setIsLoggedIn={setIsLoggedIn} />}
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
