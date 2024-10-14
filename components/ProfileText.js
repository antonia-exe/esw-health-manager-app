import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileText() {
    const [userData, setUserData] = useState({
        name: '',
        age: '',
        picture: require('../assets/chuu-do-.jpg') // Imagem fixa
    });

    // Função para calcular a idade com base na data de nascimento
    const calcularIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

    useEffect(() => {
        // Faça a requisição ao backend para buscar o nome e a data de nascimento
        axios.get('http://localhost:3001/pacientesuser/1') // Alterar o ID conforme necessário
            .then((response) => {
                const data = response.data;
                // Atualizar o estado com os dados do usuário
                setUserData({
                    ...userData,
                    name: data.nome,
                    age: calcularIdade(data.dataNascimento) // Calcular a idade a partir da data de nascimento
                });
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
    }, []);

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
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    profilepic: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 12
    }
});
