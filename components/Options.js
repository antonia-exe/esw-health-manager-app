import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Prontuario from '../Prontuario';

export default function Options({ cpf, onNavigate }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => onNavigate('Prontuario', {cpf})}>
            <FontAwesome5 name="file-medical-alt" size={26} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Prontuário</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => onNavigate('Scheduling', {cpf})}>
            <Ionicons name="calendar" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Consultas</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <Fontisto name="file-1" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Exames</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="pill" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Tratamentos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9FB285',
  },
  buttonText: {
    marginTop: 2,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
});
