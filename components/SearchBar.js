import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://10.0.0.40:3001/medicos/search/${searchQuery}`);
      console.log(response.data); // Aqui você pode fazer o que quiser com os dados, como exibi-los em uma lista
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={21} color="#9FB285" style={{ marginRight: 10 }} />
      <TextInput
        placeholder='Procure por doutores, especialidades....'
        placeholderTextColor="#BFBFBF"
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 364,
    height: 60,
    borderWidth: 1,
    borderColor: '#ABBC93',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 5,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
  },
  buttonText: {
    color: '#9FB285',
    marginLeft: 10,
  },
});
