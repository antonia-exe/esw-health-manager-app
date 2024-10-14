import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function NavBar({ activeScreen, onNavigate }) {
    
    useEffect(() => {
        const unsubscribe = onNavigate(activeScreen);
        return () => unsubscribe;
    }, [activeScreen]);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => onNavigate('Home')}
                disabled={activeScreen === 'Home'}
            >
                <FontAwesome6 
                    name="house" 
                    size={25} 
                    color={activeScreen === 'Home' ? '#616B52' : '#C2D5A8'} 
                />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => onNavigate('Scheduling')}
                disabled={activeScreen === 'Scheduling'}
            >
                <Entypo 
                    name="squared-plus" 
                    size={30} 
                    color={activeScreen === 'Scheduling' ? '#616B52' : '#C2D5A8'} 
                />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => onNavigate('ProfileUser')}
                disabled={activeScreen === 'ProfileUser'}
            >
                <Feather 
                    name="user" 
                    size={30} 
                    color={activeScreen === 'ProfileUser' ? '#616B52' : '#C2D5A8'} 
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Espalha os ícones uniformemente
        alignItems: 'center',
        backgroundColor: 'white', // Cor de fundo da barra de navegação
        paddingVertical: 20,
        borderTopWidth: 1, // Linha superior da barra
        borderColor: '#EFEFEF', // Cor da borda superior
        position: 'absolute', // Para ficar fixo na parte inferior
        bottom: 0, // Alinha na parte inferior
        left: 0, // Alinha à esquerda
        right: 0, // Alinha à direita
    },
});
