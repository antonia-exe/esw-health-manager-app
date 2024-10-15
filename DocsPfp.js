import React from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';

import BackPages from "./components/BackPages";
import NavBar from './components/NavBar';
import DocDetails from './components/DocDetails'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DocInfoPfp from './components/DocInfoPfp';
import SelectDay from './components/SelectDay';
import SelectHours from './components/SelectHours';

export default function DocsPfp({ navigation, route }) {
  const [currentScreen, setCurrentScreen] = React.useState('DocsPfp');
  const { doctor, cpf } = route.params;

  const medicoId = doctor.id;

  console.log('Dados recebidos em DocsPfp:', { cpf });

  const handleBack = () => {
    navigation.goBack();
  };


  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    navigation.navigate(screen, { doctor, cpf });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <BackPages title="Médico" onBack={handleBack} />
          <DocInfoPfp doctor={doctor}/>
          <DocDetails />
          <SelectDay medicoId={medicoId} cpf={cpf}/>
          <SelectHours medicoId={medicoId} cpf={cpf} />
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
  button: {
    backgroundColor: '#ABBC92', 
    borderRadius: 5,
    marginHorizontal:24,
    paddingVertical: 16, 
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18
  },
});