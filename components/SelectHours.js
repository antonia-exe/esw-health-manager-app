import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para o ícone de check-circle
import { useNavigation } from '@react-navigation/native'; // Para navegação entre páginas

export default function SelectHours() {
  const [selected, setSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const navigation = useNavigation(); // Hook para navegação

  const toggleSelected = () => {
    setSelected(!selected);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModalAndRedirect = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <View style={styles.container}>
        <Text style={styles.label}>Selecione o horário</Text>

        <TouchableOpacity
          style={[styles.checkbox, selected && styles.selectedCheckbox]}
          onPress={toggleSelected}
        >
          <Text style={[styles.checkboxText, selected && styles.selectedCheckboxText]}>
            14:00
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selected ? styles.activeButton : styles.inactiveButton]}
          disabled={!selected}
          onPress={openModal}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={60} color="#A8D964" style={styles.icon} />
            <Text style={styles.modalText}>Agendamento confirmado com sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModalAndRedirect} 
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 24,
    paddingTop: 24,
    paddingRight: 24,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  checkbox: {
    width: 178,
    height: 52,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ABBC93',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selectedCheckbox: {
    backgroundColor: '#C2D5A8',
    borderColor: '#C2D5A8',
  },
  checkboxText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  selectedCheckboxText: {
    color: '#000',
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  activeButton: {
    backgroundColor: '#ABBC92',
  },
  inactiveButton: {
    backgroundColor: '#BFBFBF',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#A8D964',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
