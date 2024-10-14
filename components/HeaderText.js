import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function HeaderText() {
    const userData = {
        name: 'Lívia Bezerra',
        picture: require('../assets/chuu-do-.jpg') // Utilize require aqui para carregar a imagem
    };

    return (
        <View style={styles.container}>
                <Image source={userData.picture} style={styles.profilepic} />
                <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Olá, <Text style={styles.username}>{userData.name}</Text>. Como podemos ajudar hoje?
                </Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingBottom: 20 
    },
    textContainer: {
        flex: 1,
        marginRight: 90        
    },
    text: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    },
    username: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#ABBC93'
    },
    profilepic: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight:12
    }
});
