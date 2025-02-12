import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import Loading from './Loading';
import DeleteButton from './DeleteButton';


const renderItem = (images, selectedImage, setSelectedImage) => {
  return images?.map((img) => (
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
  ))
}


const getItem = (data, index) => data[index];
const getItemCount = (data) => data?.length; 

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
      <View style={styles.galleryContainer}>
        {selectedImage?.image ? (
          <View style={styles.selectedImageContainer}>
              <View style={{width: '25%'}} />
              <Image
                source={{ uri: selectedImage.thumbnail }}
                style={styles.selectedImage}
                resizeMode="contain"
              />
              <View style={{width: '25%', alignItems: 'flex-end'}} >

                <DeleteButton />
              </View>
          </View>
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


      {(isLoadingImgs && hasStep) 
        ? <Loading /> 
        : !!images?.length && (
            <VirtualizedList
              horizontal={true}
              initialNumToRender={4}
              renderItem={() => renderItem(images, selectedImage, setSelectedImage)}
              keyExtractor={img => img.id}
              getItemCount={getItemCount}
              getItem={getItem}
              data={images}
              showsHorizontalScrollIndicator={true}
            />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    padding: 10,
  },
  selectedImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  selectedImage: {
    width: '50%',
    height: 300,
    borderRadius: 8,
  },
  noImageText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center'
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
    marginRight: 10,
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