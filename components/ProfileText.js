import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileText({ cpf }) {
    const [userData, setUserData] = useState(null); // Inicializa como null
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const defaultPicture = require('../assets/chuu-do-.jpg'); // Imagem fixa

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
        // Requisição ao backend para buscar os dados do usuário usando o CPF
        axios.get(`http://10.0.0.40:3001/pacientesuser/${cpf}`)
            .then((response) => {
                const data = response.data;
                // Atualizar o estado com os dados do usuário
                if (data) {
                    setUserData({
                        name: data.nome,
                        age: calcularIdade(data.dataNascimento), // Calcular a idade
                        picture: defaultPicture, // Imagem fixa
                    });
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            })
            .finally(() => {
                setLoading(false); // Indica que o carregamento foi concluído
            });
    }, [cpf]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Exibe um indicador de carregamento
    }

    if (!userData) {
        return <Text>Usuário não encontrado.</Text>; // Mensagem caso não encontre o usuário
    }

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
        paddingBottom: 20,
    },
    textContainer: {
        flex: 1,
        marginRight: 90,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
    username: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#ABBC93',
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
        marginRight: 12,
    },
});
