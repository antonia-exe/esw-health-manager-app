import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.container}>
        <Ionicons name="search" size={21} 
        color="#9FB285" style={{ marginRight: 10 }} />  
        <TextInput 
          placeholder='Procure por doutores, especialidades....' 
          placeholderTextColor="#BFBFBF"
          style={styles.input}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',

        backgroundColor: '#fff',

        width: 364,
        height:60,

        borderWidth: 1,
        borderColor: '#ABBC93',
        borderStyle: 'solid',
        borderRadius: 10,

        padding: 10,

        elevation: 2,
        marginTop: 5,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40
    }
});
