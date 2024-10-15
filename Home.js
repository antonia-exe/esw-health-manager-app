import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HeaderText from './components/HeaderText';
import SearchBar from './components/SearchBar';
import Options from './components/Options';
import Reminder from './components/Reminder';
import Specialties from './components/Specialties';
import NavBar from './components/NavBar';
import ConsultCalendar from './components/ConsultCalendar';

export default function Home({ navigation, route }) {
  const [currentScreen, setCurrentScreen] = React.useState('Home');
  const { cpf } = route.params;
  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    navigation.navigate(screen, { cpf });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFEF" />
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <HeaderText cpf={cpf} />
          <View style={styles.searchBarContainer}>
            <SearchBar navigation={navigation} /> 
          </View>
          <Options cpf={cpf} onNavigate={navigateToScreen} />
          <Reminder cpf={cpf} />
          <Specialties />
          <ConsultCalendar cpf={cpf} />
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
  scrollContainer: {
    paddingVertical: 24,
    paddingBottom: 100,
  },
  searchBarContainer: {
    alignItems: 'center',
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
