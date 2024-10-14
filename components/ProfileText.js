import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function ProfileText() {
    const userData = {
        name: 'Lívia Bezerra',
        age: 20,
        picture: require('../assets/chuu-do-.jpg')
    };

    return (
        <View style={styles.container}>
            <Image source={userData.picture} style={styles.profilepic} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Olá, <Text style={styles.username}>{userData.name}</Text>
                </Text>
                <Text style={styles.ageText}>
                    {userData.age} anos
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
    ageText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular', // Ajuste a fonte conforme necessário
        color: '#000', // Você pode mudar a cor conforme necessário
    },
    profilepic: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 12
    }
});
