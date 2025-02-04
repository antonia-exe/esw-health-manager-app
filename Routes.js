import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack' 

const { Navigator, Screen } = createStackNavigator();

import Login from './Login'

export default function Rotas(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} >
                <Screen name= "Login" component={Login} />
            </Navigator>
        </NavigationContainer>
    );
}