import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet
} from 'react-native';
import Loading from './Loading';

const ImageGallery = (props) => {
  const { 
    images, 
    selectedImage, 
    setSelectedImage, 
    isLoadingImgs, 
    hasStep
  } = props;

  return (
    <View>
      <View style={styles.selectedImageContainer}>
        {selectedImage?.image ? (
          <Image
            source={{ uri: selectedImage.thumbnail }}
            style={styles.selectedImage}
            resizeMode="contain"
          />
        ) : (
          <Text 
            style={styles.noImageText}
          >
            {hasStep 
            ? (!!images?.length 
              ? 'Nenhuma imagem selecionada' 
              : 'Tire uma foto')
            : 'Selecione uma etapa'}
          </Text>
        )}
      </View>

      <ScrollView
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.thumbnailContainer}
      >
        {(isLoadingImgs && hasStep) 
          ? <Loading /> 
          : images?.map((img, i) => (
            <TouchableOpacity
              key={img?.thumbnail} 
              onPress={() => setSelectedImage(img)}
            >
              <View style={[
                styles.thumbnailWrapper,
                selectedImage?.thumbnail === img?.thumbnail && styles.selectedThumbnail
              ]}>
                <Image source={{ uri: img?.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
              </View>
            </TouchableOpacity>
          )).reverse()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedImageContainer: {
    padding: 10,
    alignItems: 'center'
  },
  selectedImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  noImageText: {
    fontSize: 18,
    color: 'gray',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 5,
  },
  thumbnailWrapper: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderWidth: 6,
    borderColor: '#003366',
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
});

export default ImageGallery;