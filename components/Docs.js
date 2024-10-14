import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

export default function Docs() {
    
    const navigation = useNavigation();
    const handleProfilePress = () => {
        navigation.navigate('DocsPfp');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Principais médicos</Text>
            <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
                <Image 
                    source={{ uri: 'https://via.placeholder.com/100' }} // Substitua pela URL da imagem de perfil
                    style={styles.profileImage} 
                />
                <Text style={styles.name}>Fahlada Thananusak</Text>
                <Text style={styles.description}>Cardiologista</Text>
                <View style={styles.starsContainer}>
                    {[...Array(5)].map((_, index) => (
                        <Icon 
                            key={index} 
                            name="star" 
                            size={20} 
                            color="#ABBC93" 
                            style={styles.star} 
                        />
                    ))}
                </View>
            </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginBottom: 5,
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
    starsContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 20,
        margin: 2, 
    },
});
