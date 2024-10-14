import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HeaderText from './components/HeaderText';
import SearchBar from './components/SearchBar';
import Options from './components/Options';
import Reminder from './components/Reminder';
import Specialties from './components/Specialties';
import NavBar from './components/NavBar';
import ConsultCalendar from './components/ConsultCalendar'; // Importando o calendário

export default function Home({ navigation }) {
  const [currentScreen, setCurrentScreen] = React.useState('Home');
  
  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
      <StatusBar 
      barStyle="dark-content" backgroundColor="#EFEFEF" 
      />
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <HeaderText />
          <View style={styles.searchBarContainer}>
            <SearchBar />
          </View>
          <Options onNavigate={navigateToScreen}/>
          <Reminder />
          <Specialties />
          <ConsultCalendar />
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