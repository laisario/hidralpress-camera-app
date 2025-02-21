import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image'
import Loading from './Loading';
import DeleteButton from './DeleteButton';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import VideoPlayer from './VideoPlayer';


function formatarDataISO(isoString) {
  const data = new Date(isoString);

  const dia = String(data.getUTCDate()).padStart(2, '0');
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
  const ano = String(data.getUTCFullYear()).slice(-2);
  const horas = String(data.getUTCHours()).padStart(2, '0');
  const minutos = String(data.getUTCMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}h ${minutos}m`;
}

const Item = ({item, selectedImage, setSelectedImage}) => {
  const isVideo = item?.image?.endsWith(".mp4");

  return (
    <TouchableOpacity
    key={item?.thumbnail} 
    onPress={() => setSelectedImage(item)}
    >
      <View style={[
        styles.thumbnailWrapper,
        selectedImage?.thumbnail === item?.thumbnail && styles.selectedThumbnail,
        isVideo && styles.thumbnailVideo
      ]}>
        { isVideo 
         ? <Text style={styles.thumbnailTitle}>Vídeo {formatarDataISO(item?.created_at)}</Text>
         :  (
              <FastImage
                style={styles.thumbnail}
                source={{
                  uri: item?.thumbnail,
                  priority: FastImage?.priority?.normal,
                }}
                resizeMode={FastImage?.resizeMode?.cover}
              />
        )}
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
    hasStep,
    deleteImg,
    isPendingDelete 
  } = props;
  
  const isVideo = selectedImage?.image?.endsWith(".mp4");

  return (
    <View>
      <View style={styles.galleryContainer}>
        {selectedImage?.image ? (
          <View style={styles.selectedImageContainer}>
              <View style={{width: '25%'}} />
              {isPendingDelete 
                ? <Loading /> 
                : isVideo
                  ? 
                    <VideoPlayer 
                      video={selectedImage?.image}
                    />
                  : <FastImage
                      source={{ 
                        uri: selectedImage.thumbnail,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.selectedImage}
                      resizeMode={FastImage.resizeMode.contain}
                    />
              }
              <View style={{width: '25%', alignItems: 'flex-end'}} >
               {selectedImage?.id > 0  && (
                  <DeleteButton 
                    onPress={deleteImg} 
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                )}
              </View>
          </View>
        ) : (
          <Text 
            style={styles.noImageText}
          >
            {hasStep 
            ? (!!images?.length 
              ? 'Nenhuma imagem ou vídeo selecionado' 
              : 'Tire uma foto ou grave um vídeo')
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
  container: {
    marginBottom: 10
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  thumbnailVideo: {
    backgroundColor: 'rgb(170, 170, 170)'

  },
  thumbnailTitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default ImageGallery;