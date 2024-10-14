import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': { uri: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8do6iZ7P68hXMgW0UuKOs6F4c.woff2' },
    'Poppins-Bold': { uri: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8do6iZ7P68hXMgW0UuKOs6F4c.woff2' },
  });
};

export default function Login() {
  const [form, setForm] = useState({
    cpf: '', // CPF do usuário
    password: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.0.40:3001/login', { // Atualize o URL conforme necessário
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: form.cpf,
          password: form.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const data = await response.json();
      console.log('Login bem-sucedido:', data);
      navigation.navigate('Home', {cpf: form.cpf}); // Navegue para a tela inicial ou onde quiser
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique seu CPF e senha.'); // Mensagem de erro para o usuário
    }
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // Retorna null até que as fontes sejam carregadas
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('./assets/logo.jpg')}
          />
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>CPF</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="numeric" // Ajustado para numeric
              onChangeText={cpf => setForm({ ...form, cpf })} // Atualizado para cpf
              placeholder="000.000.000-00"
              placeholderTextColor="#616B52"
              style={styles.inputControl}
              value={form.cpf} // Atualizado para cpf
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>SENHA</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#616B52"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.forgotpassword}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Entrar</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  A recuperação de senha deve ser feita pela administração do hospital. Por favor, entre em contato.
                </Text>

                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 142,
    height: 131.11,
    alignSelf: 'center',
    marginBottom: 36,
    marginTop: 130,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 48,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    fontWeight: '300',
    color: '#616B52',
    marginBottom: 4,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#ABBC93',
    borderStyle: 'solid',
  },
  forgotpassword: {
    fontSize: 14,
    fontWeight: '300',
    color: '#616B52',
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#ABBC92',
    borderColor: '#ABBC92',
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 20,
    color: '#616B52',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  closeBtn: {
    backgroundColor: '#ABBC92',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
