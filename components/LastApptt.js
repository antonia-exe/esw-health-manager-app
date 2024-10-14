import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LastAppt() {
    const doctorData = {
        name: 'Cristina Yang',
        specialty: 'Cardiologista',
        picture: require('../assets/cristina.jpg'),
    };

    const appointmentData = {
        date: '12/09/2024',
        time: '14:00',
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Últimas Consultas</Text>
            <View style={styles.appttCard}>
                <View style={styles.InfoContainer}>
                    <Image source={doctorData.picture} style={styles.profilePic} />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{doctorData.name}</Text>
                        <Text style={styles.specialty}>{doctorData.specialty}</Text>
                    </View>
                </View>
                <View style={styles.dateTimeContainer}>
                    <Ionicons name="calendar" size={20} color="#616B52" />
                    <Text style={styles.dateTimeText}>{appointmentData.date} às {appointmentData.time}h</Text>
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
