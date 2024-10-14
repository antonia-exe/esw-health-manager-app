import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BackPages from "./components/BackPages";
import NavBar from './components/NavBar';
import SelectionSpc from './components/SelectionSpc';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Docs from './components/Docs';
import DocDetails from './components/DocDetails';

export default function Scheduling({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  const [currentScreen, setCurrentScreen] = React.useState('Scheduling');

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    navigation.navigate(screen);
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
          <SelectionSpc />
          <Docs/>
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
