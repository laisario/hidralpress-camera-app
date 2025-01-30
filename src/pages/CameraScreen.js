import React, { useState } from 'react';
import { Alert, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import { useData } from '../hooks/useData';
import { Picker } from "@react-native-picker/picker";
import useSubmitData from '../hooks/useSubmitData';
import { useNavigation, useTheme } from '@react-navigation/native';
import useImages from '../hooks/useImages';
import ImageGallery from '../components/ImageGallery';
import Loading from '../components/Loading';

const stepsText = {
  'desmontagem': {
    'C-EQUIPAMENTO': 'CHEGADA',
    'E-DESMONTADO': 'DESMONTADO',
    'E-PRONTO': 'PRONTO'
  },
  'montagem': {
    'E-MONTAGEM': 'MONTAGEM',
    'E-TESTE': 'TESTE'
  }
}

function CameraScreen({route}) {
  const { os, sector } = route.params;
  const [step, setStep] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const { stepsMapping } = useData();
  const { 
    handleSubmit, 
    error, 
    setError, 
    isLoading
  } = useSubmitData();

  const { 
    images, 
    isLoadingImgs
  } = useImages({ step, os })
  const navigation = useNavigation();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const sendPhoto = async (image) => {
    const data = new FormData();
    data.append('os', os);
    data.append('sector', sector);
    data.append('step', step);
    data.append('image', image);
    handleSubmit(data)
  }
  
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: false,
      maxHeight: 1920,
      maxWidth: 1080,
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        console.error('User cancelled camera');
        return null
      } else if (response.error) {
        console.error('Camera Error: ', response.error);
        return null
      } 
      const imageUri = response.uri || response.assets?.[0]?.uri;
      const imageName = response.fileName || response.assets?.[0]?.fileName;
      const imageType = response.type || response.assets?.[0]?.type;
      sendPhoto({uri: imageUri, name: imageName, type: imageType})
    });
  }

  const handleClickFinish = () => {
    navigation.navigate("OS")
  }

  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <Text variant="titleMedium" style={styles.title}>
          Selecione a etapa que está fotografando:
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={step}
            onValueChange={(itemValue) => setStep(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Escolha a etapa:" value="" />
            {stepsMapping[sector]?.length && stepsMapping[sector]?.map((stepItem) => (
              <Picker.Item
                label={stepsText[sector]?.[stepItem?.name]}
                value={stepItem?.name}
                key={stepItem?.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.containedButton,
              { backgroundColor: (images?.length > 1 && step) 
                ? colors.primary 
                : colors.disabled 
              },
            ]}
            onPress={handleCameraLaunch}
            disabled={step.length < 1}
          >
            <Text style={styles.containedButtonText}>
              Bater foto
            </Text>
          </TouchableOpacity>
        </View>

        { isLoading 
          ? <Loading /> 
          : (
            <ImageGallery
              images={images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              isLoadingImgs={isLoadingImgs}
            />
          )
        }
      </View>

      {error && Alert.alert('Erro', error, [{ text: 'OK', onPress: () => setError(false) }])}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.containedButton,
            { backgroundColor: (images?.length > 1 && step) 
              ? colors.primary 
              : colors.disabled 
            },
          ]}
          onPress={handleClickFinish}
          disabled={!(images?.length > 1 && step)}
        >
          <Text style={styles.containedButtonText}>
            Finalizar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CameraScreen;


const makeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  insideContainer: {
    padding: 8
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    color: colors.primary,
  },
  alert: {
    color: "red",
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    width: "100%",
  },
  containedButton: {
    backgroundColor: '#03A9F4',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 0,
    width: '100%',
  },
  containedButtonText: {
    color: "#fff",
    fontSize: 16,
    textTransform: 'uppercase'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
});