import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import BackPages from './components/BackPages';
import NavBar from './components/NavBar';
import ProfileText from './components/ProfileText';
import NextApptt from './components/NextApptt';
import Geral from './components/Geral';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileUser({ navigation, route }) {
  // Extraindo o CPF corretamente
  const cpf = route.params.cpf; // Modificação aqui

  const handleBack = () => {
    navigation.goBack();
  };

  const [currentScreen, setCurrentScreen] = React.useState('ProfileUser');

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    navigation.navigate(screen, { cpf });
  };

  const handleButtonPress = () => {
    console.log('Botão pressionado!');
  };

  // Adicionando console.log para verificar o CPF
  console.log('CPF na ProfileUser:', cpf); // Adicione esta linha para depuração

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <BackPages title="Perfil" onBack={handleBack} />
          <ProfileText cpf={cpf}/>
          <NextApptt cpf={cpf}/>
          <Geral/>
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
    backgroundColor: '#EFEFEF'
  },
});
