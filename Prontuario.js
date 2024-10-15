import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import BackPages from "./components/BackPages";
import ProfileText from './components/ProfileText';
import NextAppt from './components/NextApptt'; // Adicione o CPF se necessário
import LastAppt from './components/LastApptt'; // Adicione o CPF se necessário
import MoreInfos from './components/MoreInfos'; // Adicione o CPF se necessário
import NavBar from './components/NavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Prontuario({ navigation, route }) {
    const { cpf } = route.params; 

    const handleBack = () => {
        navigation.goBack();
    };

    const [currentScreen, setCurrentScreen] = React.useState('Prontuario');
    
    const navigateToScreen = (screen) => {
        setCurrentScreen(screen);
        navigation.navigate(screen, { cpf }); // Passando o CPF para outras páginas
    };

    const handleButtonPress = () => {
        console.log('Botão pressionado!');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <BackPages title="Prontuário" onBack={handleBack} />
                    <ProfileText cpf={cpf} />
                    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                        <Text style={styles.buttonText}>Realizar exame físico</Text>
                    </TouchableOpacity>
                    <NextAppt cpf={cpf} /> 
                    <LastAppt cpf={cpf} /> 
                    <MoreInfos cpf={cpf} />
                </KeyboardAwareScrollView>
                <NavBar 
                    activeScreen={currentScreen}
                    onNavigate={navigateToScreen}
                    cpf={cpf}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    button: {
        backgroundColor: '#ABBC92', 
        borderRadius: 5,
        marginHorizontal: 24,
        paddingVertical: 16, 
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
    },
});
