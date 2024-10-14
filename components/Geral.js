import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Geral({ }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Geral</Text>

      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="hand-heart" size={30} color="#C2D5A8" style={styles.icon} />
        <Text style={styles.buttonText}>Cuidador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="cog" size={30} color="#C2D5A8" style={styles.icon} />
        <Text style={styles.buttonText}>Configurações de perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
      <AntDesign name="infocirlce" size={28} color="#C2D5A8" style={styles.icon} />
        <Text style={styles.buttonText}>Informações sobre a clínica</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 24,
    paddingRight: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
    marginTop:10,
    textAlign: 'left',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 16, 
  },
  icon: {
    marginRight: 20,
    marginLeft: 10
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
});
