import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

export default function SelectHours({ selectedDay, selectedMonth, medicoId, cpf }) {
    
    console.log('CPF recebido em SelectHours:', cpf)

    const [availableHours, setAvailableHours] = useState([]);
    const [selected, setSelected] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); 
    const navigation = useNavigation(); 

    useEffect(() => {
        const fetchAvailableHours = async () => {
            try {
                const response = await fetch(`http://10.0.0.40:3001/agendamentos/${medicoId}`); 
                const agendamentos = await response.json();

                const horasAgendadas = agendamentos.map(agendamento => new Date(agendamento.dataConsulta).getHours());
                const allHours = Array.from({ length: 10 }, (_, i) => 8 + i);

                const availableHours = allHours.filter(hour => !horasAgendadas.includes(hour));
                setAvailableHours(availableHours.map(hour => `${hour}:00`));
            } catch (error) {
                console.error('Erro ao buscar horários disponíveis:', error);
            }
        };

        if (selectedDay && selectedMonth && medicoId) {
            fetchAvailableHours();
        }
    }, [selectedDay, selectedMonth, medicoId]);

    const toggleSelected = (hour) => {
        setSelected(hour);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModalAndRedirect = async () => {
        try {
            const year = new Date().getFullYear(); // Captura o ano atual
            // Formato: ano-mês-dia
            const formattedDate = `${year}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')} ${selected}:00`;
            
            const agendamentoData = {
                dataConsulta: formattedDate, // Usando o formato ano-mês-dia
                cpf: cpf,
                medicoId: medicoId
            };
            
            const response = await fetch('http://10.0.0.40:3001/agendamentos-cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendamentoData),
            });

            const responseText = await response.text();
            console.log('Resposta do servidor:', responseText);

            const responseData = JSON.parse(responseText);

            if (response.ok) {
                console.log('Agendamento realizado com sucesso!', responseData);
            } else {
                console.error('Erro ao agendar:', response.status, responseData);
            }
        } catch (error) {
            console.error('Erro ao agendar:', error);
        } finally {
            setModalVisible(false);
        }

    };
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
            <View style={styles.container}>
                {availableHours.length > 0 ? (
                    <Text style={styles.label}>Selecione o horário</Text>
                ) : (
                    <Text style={styles.label}></Text>
                )}

                <View style={styles.hoursContainer}>
                    {availableHours.map((hour, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.checkbox, selected === hour && styles.selectedCheckbox]}
                            onPress={() => toggleSelected(hour)}
                        >
                            <Text style={[styles.checkboxText, selected === hour && styles.selectedCheckboxText]}>
                                {hour}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.button, selected ? styles.activeButton : styles.inactiveButton]}
                    disabled={!selected}
                    onPress={openModal}
                >
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>

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
    hoursContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Permite que os elementos quebrem para a próxima linha
        justifyContent: 'space-between', // Distribui o espaço entre os botões
    },
    checkbox: {
        width: '48%', // Ajusta a largura para caber duas por linha
        height: 52,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ABBC93',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10, // Para melhor espaçamento entre os checkboxes
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
