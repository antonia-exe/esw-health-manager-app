import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function LastAppt({ cpf }) {
    const [lastAppointment, setLastAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLastAppointment = async () => {
        try {
            const response = await axios.get(`http://10.0.0.40:3001/ultima-consulta/${cpf}`);
            setLastAppointment(response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLastAppointment(); // Chama a função ao montar o componente
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!lastAppointment) {
        return <Text></Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Última Consulta</Text>
            <View style={styles.appttCard}>
                <View style={styles.InfoContainer}>
                    <Image source={require('../assets/cristina.jpg')} style={styles.profilePic} />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{lastAppointment.medicoNome}</Text>
                        <Text style={styles.specialty}>{lastAppointment.medicoEspecialidade}</Text>
                    </View>
                </View>
                <View style={styles.dateTimeContainer}>
                    <Ionicons name="calendar" size={20} color="#616B52" />
                    <Text style={styles.dateTimeText}>
                        {new Date(lastAppointment.dataConsulta).toLocaleDateString()} às {new Date(lastAppointment.dataConsulta).toLocaleTimeString()}h
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.detailsButton]}>
                        <Text style={styles.buttonText}>Detalhes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 20
    },
    title: {
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
        marginBottom: 5,
    },
    appttCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',
    },
    InfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    doctorInfo: {
        flexDirection: 'column',
    },
    doctorName: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
    },
    specialty: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingLeft: 70
    },
    dateTimeText: {
        fontFamily: 'Poppins-Regular',
        marginLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 66,
        marginTop: 20,
    },
    button: {
        width: 118,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5, 
    },
    detailsButton: {
        backgroundColor: '#ABBC92',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold'
    },
});
