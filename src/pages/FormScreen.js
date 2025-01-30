import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions 
} from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import axios from '../api';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

function FormScreen() {
  const [os, setOs] = useState('');
  const [os2, setOs2] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  
  const handleClick = async () => {
    const fullOs = `OS ${os}-${os2}`;
    const osForm = new FormData();
    osForm.append('os', fullOs);
    setLoading(true);
    try {
      const response = await axios.post('/validate-os/', osForm);
      setLoading(false);
      if (response?.data?.ok) {
        navigation.navigate('Setor', { os: fullOs });
      } else {
        setError(`Pasta '${fullOs}' não encontrada.`);
      }
    } catch (error) {
      console.error(error.response);

      setLoading(false);
      setError('Não foi possível realizar esta operação. Verifique se o sistema está no ar.');
    }
  };
  
  const handleChangeInputOne = (value) => {
    setOs(value);
    if (value?.length === 3) {
      input2Ref.current.focus();
    }
  };

  const handleChangeInputTwo = (value) => {
    setOs2(value);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Preencha o campo com o número da ordem de serviço:</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>OS</Text>
          <TextInput
            value={os}
            maxLength={3}
            autoFocus
            style={styles.input}
            keyboardType="numeric"
            onChangeText={handleChangeInputOne}
            ref={input1Ref}
            />
          <Text style={styles.inputLabel}>-</Text>
          <TextInput
            value={os2}
            maxLength={2}
            style={styles.input}
            keyboardType="numeric"
            ref={input2Ref}
            onChangeText={handleChangeInputTwo}
            />
        </View>
        {error && Alert.alert('Erro', error, [{ text: 'OK', onPress: () => setError(false) }])}
              
        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity
          style={[
            styles.button,
            !(os?.length === 3 && os2?.length === 2) && styles.buttonDisabled,
          ]}
          onPress={handleClick}
          disabled={!(os?.length === 3 && os2?.length === 2)}
          >
            <Text style={styles.buttonText}>Escolher setor</Text>
          </TouchableOpacity>
        )}
      </View>
      <Footer />
    </View>
  )
}


export default FormScreen;

const windowWidth = Dimensions.get('window').width;

const makeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  containerForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: windowWidth * 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    marginVertical: 40,
    width: windowWidth * 0.6,
  },
  inputLabel: {
    fontSize: 18,
  },
  input: {
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: windowWidth * 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
});