import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

export default function ConsultCalendar({ cpf }) {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const response = await axios.get(`http://10.0.0.40:3001/consultas/${cpf}`);
        console.log(response.data); // Verifica a resposta do servidor
        const consultas = response.data;
        const marks = {};

        consultas.forEach(consulta => {
          const dateTime = consulta.dataConsulta; // A data e hora que vem do banco
          const date = dateTime.split('T')[0]; // Extrai a parte da data, ignorando a hora
          marks[date] = { marked: true, dotColor: '#616B52' }; // Marca o dia com um ponto
        });

        setMarkedDates(marks);
        console.log('Marked Dates:', marks); // Verifica as datas marcadas
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    }

    fetchConsultas();
  }, [cpf]);

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
