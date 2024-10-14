import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';

import BackPages from './components/BackPages';
import NavBar from './components/NavBar';
import ProfileText from './components/ProfileText';
import NextApptt from './components/NextApptt';
import Geral from './components/Geral';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileUser({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  const [currentScreen, setCurrentScreen] = React.useState('ProfileUser');

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
          <BackPages title="Perfil" onBack={handleBack} />
          <ProfileText/>
          <NextApptt/>
          <Geral/>
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
