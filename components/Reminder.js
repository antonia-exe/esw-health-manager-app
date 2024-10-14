import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Reminder() {
    const userData = {
        pill_name: 'Ibuprofeno',
        pill_dosage: '200',
        pill_quant: '2',
        pill_time: '12:00',
        pill_day: '2'
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lembretes</Text>
            <View style={styles.rectangle}>
                <View style={styles.row}>
                    <FontAwesome5 name="pills" size={40} color="#9FB285"/>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{userData.pill_name}, {userData.pill_dosage}mg</Text>
                        <Text style={styles.dosage}>{userData.pill_quant} pílulas, {userData.pill_day} vezes por dia</Text>
                        <View style={styles.time}>
                            <AntDesign name="clockcircle" size={12} color="#ABBC93"/>
                            <Text style={styles.texttime}>{userData.pill_time}</Text>
                        </View>
                    </View>
                </View>
            </View>
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
        fontFamily:'Poppins-SemiBold',
    },
    dosage: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        paddingBottom: 5
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    texttime: {
        marginLeft: 5,
        fontSize: 14,
        fontFamily:'Poppins-Regular'
    },
});
