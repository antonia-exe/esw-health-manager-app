import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';

import BackPages from "./components/BackPages";
import NavBar from './components/NavBar';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <BackPages title="Agendamento" onBack={handleBack} />
        </KeyboardAwareScrollView>
        <NavBar 
            activeScreen={currentScreen}
            onNavigate={navigateToScreen}
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
