import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';

export default function Reminder({ cpf }) {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://10.0.0.40:3001/receitas/${cpf}`);
                setUserData(response.data); // Aqui recebemos o array de receitas
            } catch (err) {
                userData([null, null])
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cpf]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lembretes</Text>
            {userData.length > 0 ? (
                userData.map((item, index) => (
                    <View key={index} style={styles.rectangle}>
                        <View style={styles.row}>
                            <FontAwesome5 name="pills" size={40} color="#9FB285" />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.medicacao}, {item.dosagem}mg</Text>
                                <Text style={styles.dosage}>{item.frequencia} vezes por dia</Text>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <View style={styles.rectangle}>
                            <View style={styles.textContainer2}>
                            <Text style={styles.othertext}>Você não tem lembretes no momento. Agende uma consulta!</Text> 
                            </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
        marginBottom: 5,
    },
    rectangle: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 15,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    dosage: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        paddingBottom: 5,
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    texttime: {
        marginLeft: 5,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    textContainer2:{
        marginLeft: 10,
    },
    othertext: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        paddingRight: 10
    },
});
