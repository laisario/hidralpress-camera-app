import React, { useState } from 'react';
import { 
  Alert, 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import { useData } from '../hooks/useData';
import { Picker } from "@react-native-picker/picker";
import useSubmitData from '../hooks/useSubmitData';
import { useNavigation, useTheme } from '@react-navigation/native';
import ImageGallery from '../components/ImageGallery';
import Loading from '../components/Loading';
import useContent from '../hooks/useImages';

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
  const [selectedImage, setSelectedImage] = useState(null);
  const { stepsMapping } = useData();
  const { 
    handleSubmit, 
    error, 
    setError, 
    isPending
  } = useSubmitData();

  const { 
    content, 
    isLoadingImgs,
  } = useContent({ step, os })
  const navigation = useNavigation();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const sendPhoto = async (file, isImg) => {
    const data = new FormData();
    data.append('os', os);
    data.append('sector', sector);
    data.append('step', step);
    if (isImg) {
      data.append('image', file);
    } else {
      data.append('video', file)
    }
    handleSubmit(data)
  }
  
  const handleCameraPhotoLaunch = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: false,
      maxHeight: 1920,
      maxWidth: 1080,
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        return null
      } else if (response.error) {
        console.error('Camera Error: ', response.error);
        return null
      } 
      const imageUri = response.uri || response.assets?.[0]?.uri;
      const imageName = response.fileName || response.assets?.[0]?.fileName;
      const imageType = response.type || response.assets?.[0]?.type;
      sendPhoto({uri: imageUri, name: imageName, type: imageType}, true)
    });
  }

  const handleCameraVideoLaunch = () => {
    const options = {
      mediaType: 'video',
      cameraType: 'back',
      includeBase64: false,
      maxHeight: 1920,
      maxWidth: 1080,
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        return null
      } else if (response.error) {
        console.error('Camera Error: ', response.error);
        return null
      } 
      const videoUri = response?.uri || response?.assets?.[0]?.uri;
      const videoName = response?.fileName || response?.assets?.[0]?.fileName;
      const videoType = response?.type || response?.assets?.[0]?.type;
      sendPhoto({uri: videoUri, name: videoName, type: videoType}, false)
    });
  }

  const handleClickFinish = () => {
    navigation.navigate("OS")
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollContainer}>
      <View style={styles.insideContainer}>
        <Text variant="titleMedium" style={styles.title}>
          Selecione a etapa que está fotografando:
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={step}
            onValueChange={(itemValue) => {setStep(itemValue); setSelectedImage(null)}}
            style={styles.picker}
          >
            <Picker.Item label="Escolha a etapa" value="" />
            {stepsMapping[sector]?.length && stepsMapping[sector]?.map((stepItem) => (
              <Picker.Item
              label={stepsText[sector]?.[stepItem?.name]}
              value={stepItem?.name}
              key={stepItem?.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.containerButtons}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.cameraButton,
                { backgroundColor: !!step 
                  ? colors.primary 
                  : colors.disabled 
                },
              ]}
              onPress={handleCameraPhotoLaunch}
              disabled={!step}
              >
              <Text style={styles.containedButtonText}>
                Bater foto
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.cameraButton,
                { backgroundColor: !!step 
                  ? colors.card
                  : colors.disabled 
                },
              ]}
              onPress={handleCameraVideoLaunch}
              disabled={!step}
              >
              <Text style={styles.containedButtonText}>
                Gravar vídeo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ImageGallery
        content={content}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        isLoadingImgs={isLoadingImgs}
        hasStep={!!step}
      />

      {error && Alert.alert('Erro', error, [{ text: 'OK', onPress: () => setError(false) }])}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.containedButton,
            { backgroundColor: (content?.length >= 1 && !!step) 
              ? colors.primary 
              : colors.disabled 
            },
          ]}
          onPress={handleClickFinish}
          disabled={!(content?.length >= 1 && !!step)}
        >
          <Text style={styles.containedButtonText}>
            Finalizar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default CameraScreen;

const windowWidth = Dimensions.get('window').width;

const makeStyles = (colors) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    color: colors.primary,
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
    alignItems: "center",
    justifyContent: "center",
  },
  containedButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 0,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    textAlign: 'center',
    width: windowWidth * 0.4,
  },
  containedButtonText: {
    color: "#fff",
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    marginTop: 20
  }

});