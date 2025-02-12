import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
} from 'react-native';
import Loading from './Loading';
import DeleteButton from './DeleteButton';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


const Item = ({item, selectedImage, setSelectedImage}) => {
  console.log(item, 'achar')
  return (
    <TouchableOpacity
      key={item?.thumbnail} 
      onPress={() => setSelectedImage(item)}
    >
      <View style={[
        styles.thumbnailWrapper,
        selectedImage?.thumbnail === item?.thumbnail && styles.selectedThumbnail
      ]}>
        <Image source={{ uri: item?.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  )
}


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
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <FlatList
                horizontal={true}
                renderItem={({item}) => <Item item={item} selectedImage={selectedImage} setSelectedImage={setSelectedImage}  />}
                keyExtractor={img => img.id}
                data={images}
              />
            </SafeAreaView>
          </SafeAreaProvider>
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