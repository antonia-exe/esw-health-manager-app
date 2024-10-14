import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Importando axios

export default function Docs({ specialty }) {
    const navigation = useNavigation();
    const [doctors, setDoctors] = useState([]);

    // Função para buscar médicos pela especialidade
    const fetchDoctors = async () => {
        if (!specialty) return; // Se não houver especialidade, não faz a requisição

        try {
            const response = await axios.get(`http://10.0.0.40:3001/medicos/${specialty}`);
            setDoctors(response.data); // Armazena os médicos recebidos no estado
        } catch (error) {
            console.error("Erro ao buscar médicos:", error);
        }
    };

    useEffect(() => {
        fetchDoctors(); // Chama a função quando a especialidade muda
    }, [specialty]);

    const handleProfilePress = (doctor) => {
        navigation.navigate('DocsPfp', { doctor }); // Passa informações do médico para a próxima tela
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Principais médicos</Text>
            {doctors.map((doctor, index) => (
                <TouchableOpacity key={index} style={styles.profileContainer} onPress={() => handleProfilePress(doctor)}>
                    <Image 
                        source={{ uri: 'https://via.placeholder.com/100' }} // Substitua pela URL da imagem de perfil
                        style={styles.profileImage} 
                    />
                    <Text style={styles.name}>{doctor.nome}</Text>
                    <Text style={styles.description}>{doctor.especialidade}</Text>
                    <View style={styles.starsContainer}>
                        {[...Array(Math.floor(Math.random() * 5) + 1)].map((_, index) => (
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
            ))}
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
        marginBottom: 10, // Adicione um espaço entre os perfis
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
