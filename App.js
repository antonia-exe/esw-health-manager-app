import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Home from './Home';
import Prontuario from './Prontuario';
import Scheduling from './Scheduling';
import DocsPfp from './DocsPfp';
import ProfileUser from './ProfileUser';

const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
};

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Ou pode retornar um componente de loading se preferir
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen
          name='Prontuario'
          component={Prontuario}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Scheduling'
          component={Scheduling}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='DocsPfp'
          component={DocsPfp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='ProfileUser'
          component={ProfileUser}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
