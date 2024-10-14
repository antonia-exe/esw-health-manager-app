import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getConsultas } from '../services/Consulta';

export default function ConsultCalendar() {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    async function fetchConsultas() {
      const consultas = await getConsultas(); // Busca as consultas do banco
      const marks = {};

      consultas.forEach(consulta => {
        const date = consulta.data; // Data da consulta no formato 'YYYY-MM-DD'
        marks[date] = { marked: true, dotColor: '#616B52' }; // Marca o dia com um ponto
      });

      setMarkedDates(marks);
    }

    fetchConsultas();
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates} 
        markingType={'dot'} 
        theme={{
          todayTextColor: '#616B52',
          arrowColor: '#616B52',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});