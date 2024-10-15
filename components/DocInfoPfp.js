import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DocInfoPfp({ doctor }) {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image 
                    source={{ uri: doctor?.imagem || 'https://via.placeholder.com/100' }} 
                    style={styles.profileImage} 
                />
                <Text style={styles.name}>{doctor?.nome || 'Nome do Médico'}</Text> 
                <Text style={styles.description}>{doctor?.especialidade || 'Especialidade'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#EFEFEF',
        justifyContent: 'center',
        alignItems: 'left',
    },
    profileContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
});
