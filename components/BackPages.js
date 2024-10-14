import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BackPages({ title, onBack }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EFEFEF', 
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10, 
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    flex: 1, 
    textAlign: 'center',
  },
  spacer: {
    width: 24,
  },
});
