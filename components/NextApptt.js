import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function NextAppt({ cpf }) {
    const [nextAppointment, setNextAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNextAppointment = async () => {
        try {
            const response = await axios.get(`http://10.0.0.40:3001/proxima-consulta/${cpf}`);
            setNextAppointment(response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNextAppointment();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!nextAppointment) {
        return (
            <View style={styles.container}>
                <View style={styles.noApptCard}>
                    <Text style={styles.noApptText}>Não há consultas agendadas</Text>
                    <TouchableOpacity style={styles.scheduleButton}>
                        <Text style={styles.scheduleButtonText}>Agendar agora</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Próxima Consulta</Text>
            <View style={styles.appttCard}>
                <View style={styles.InfoContainer}>
                    <Image source={require('../assets/fahlada.jpg')} style={styles.profilePic} />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{nextAppointment.medicoNome}</Text>
                        <Text style={styles.specialty}>{nextAppointment.medicoEspecialidade}</Text>
                    </View>
                </View>
                <View style={styles.dateTimeContainer}>
                    <Ionicons name="calendar" size={20} color="#616B52" />
                    <Text style={styles.dateTimeText}>
                        {new Date(nextAppointment.dataConsulta).toLocaleDateString()} às {new Date(nextAppointment.dataConsulta).toLocaleTimeString()}h
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.reschButton]}>
                        <Text style={styles.buttonText}>Remarcar</Text>
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
        paddingTop: 10,
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
        paddingLeft: 70,
    },
    dateTimeText: {
        fontFamily: 'Poppins-Regular',
        marginLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 195,
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
    cancelButton: {
        backgroundColor: '#BFBFBF',
    },
    reschButton: {
        backgroundColor: '#ABBC92',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
    },
    noApptCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    noApptText: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        marginBottom: 10,
    },
    scheduleButton: {
        backgroundColor: '#ABBC92',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    scheduleButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },

});
