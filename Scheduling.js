import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BackPages from "./components/BackPages";
import NavBar from './components/NavBar';
import SelectionSpc from './components/SelectionSpc';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Docs from './components/Docs';

export default function Scheduling({ navigation, route }) {
  const {cpf} = route.params;

  const handleBack = () => {
    navigation.goBack();
  };
  const [currentScreen, setCurrentScreen] = useState('Scheduling');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    navigation.navigate(screen, { cpf });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView 
        style={styles.scrollView} 
        resetScrollToCoords={{ x: 0, y: 0 }} 
        scrollEnabled={true} 
        keyboardShouldPersistTaps='handled' 
      >
        <View style={styles.container}>
          <BackPages title="Agendamento" onBack={handleBack} />
          <SelectionSpc onSelectSpecialty={setSelectedSpecialty} />
          <Docs specialty={selectedSpecialty} cpf={cpf}/>
        </View>
      </KeyboardAwareScrollView>
      <NavBar 
          activeScreen={currentScreen}
          onNavigate={navigateToScreen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
});
