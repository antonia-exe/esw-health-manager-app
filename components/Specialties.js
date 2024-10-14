import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function Specialties() {
    const handlePress = (specialty) => {
        console.log(`Especialidade: ${specialty}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Especialidades</Text>
            <View style={styles.rectanglesContainer}>
                <TouchableOpacity style={styles.rectangle} onPress={() => handlePress('Cardiologia')}>
                    <MaterialCommunityIcons name="heart-pulse" size={38} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rectangle} onPress={() => handlePress('Neurologia')}>
                    <FontAwesome5 name="brain" size={30} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rectangle} onPress={() => handlePress('Otorrinolaringologia')}>
                    <FontAwesome6 name="ear-listen" size={30} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rectangle} onPress={() => handlePress('Oftalmologia')}>
                    <MaterialCommunityIcons name="eye-outline" size={35} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rectangle} onPress={() => handlePress('Hematologia')}>
                    <Fontisto name="blood-drop" size={29} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginBottom: 5,
        color: '#333',
    },
    rectanglesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rectangle: {
        width: 70,
        height: 100,
        backgroundColor: '#ABBC93',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
