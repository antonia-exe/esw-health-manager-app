import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';

import BackPages from "./components/BackPages";
import ProfileText from './components/ProfileText';
import NextAppt from './components/NextApptt';
import LastAppt from './components/LastApptt';
import MoreInfos from './components/MoreInfos'
import NavBar from './components/NavBar';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Prontuario({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  const [currentScreen, setCurrentScreen] = React.useState('Prontuario');

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    navigation.navigate(screen);
  };

  const handleButtonPress = () => {
    console.log('Botão pressionado!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <BackPages title="Prontuário" onBack={handleBack} />
          <ProfileText/>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Realizar exame físico</Text>
          </TouchableOpacity>
          <NextAppt/>
          <LastAppt/>
          <MoreInfos/>
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
