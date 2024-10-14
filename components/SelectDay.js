import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { Ionicons } from '@expo/vector-icons';


export default function SelectDay() {
  const [selectedDay, setSelectedDay] = useState('1'); // Estado para o dia selecionado
  const [selectedMonth, setSelectedMonth] = useState('1'); // Estado para o mês selecionado

  // Array de dias (1-31)
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  
  // Array de meses (1-12)
  const months = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Maio', value: '5' },
    { label: 'Junho', value: '6' },
    { label: 'Julho', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setembro', value: '9' },
    { label: 'Outubro', value: '10' },
    { label: 'Novembro', value: '11' },
    { label: 'Dezembro', value: '12' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Selecione o dia</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Ionicons name='calendar' size={30} color='#616B52' style={styles.icon}/>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedDay}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
              {days.map((day) => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMonth}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
              {months.map((month) => (
                <Picker.Item key={month.value} label={month.label} value={month.value} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    width: '90%',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'left', 
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '90%',
  },
  pickerWrapper: {
    flex: 1,
    borderColor: '#616B52',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5, 
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    color: '#333',
  },
});
