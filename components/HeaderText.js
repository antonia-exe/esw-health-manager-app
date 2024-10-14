import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Adicione o Axios se ainda não estiver no projeto

export default function HeaderText({ cpf }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://10.0.0.40:3001/pacientesuser/${cpf}`); // Substitua IP pelo seu IP real
                setUserData(response.data); // Supondo que a resposta tenha um campo 'nome'
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [cpf]); // Executa a requisição quando o componente monta ou o CPF muda

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Mostra um indicador de carregamento
    }

    if (!userData) {
        return <Text>Usuário não encontrado</Text>; // Exibe mensagem se não encontrar o usuário
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/chuu-do-.jpg')} style={styles.profilepic} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Olá, <Text style={styles.username}>{userData.nome}</Text>. Como podemos ajudar hoje?
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
        marginRight: 12
    }
});
