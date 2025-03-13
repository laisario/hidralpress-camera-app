import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image'
import Loading from './Loading';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import VideoPlayer from './VideoPlayer';


const Item = ({item: propItem, selectedImage, setSelectedImage}) => {
  const isVideo = propItem?.video;
  const item = isVideo ? propItem?.video : propItem?.image

  return (
    <TouchableOpacity
      key={item?.id} 
      onPress={() => setSelectedImage(item)}
    >
      <View style={[
        styles.thumbnailWrapper,
        selectedImage?.id === item?.id && styles.selectedThumbnail,
        isVideo && styles.thumbnailVideo
      ]}>
        {isVideo 
         ? <Text style={styles.thumbnailTitle}>Vídeo {item?.id}</Text>
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
    content, 
    selectedImage, 
    setSelectedImage, 
    isLoadingImgs, 
    hasStep,
    isPendingDelete,
    isPendingDeleteVideo,
  } = props;
  const isVideo = selectedImage?.video;

  return (
    <View>
      <View style={styles.galleryContainer}>
        {selectedImage?.image || selectedImage?.video ? (
          <View style={styles.selectedImageContainer}>
              {isPendingDelete || isPendingDeleteVideo 
                ? <Loading /> 
                : isVideo
                  ? 
                    <VideoPlayer 
                      video={selectedImage?.video}
                    />
                  : <FastImage
                      source={{ 
                        uri: selectedImage.image,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.selectedImage}
                      resizeMode={FastImage.resizeMode.contain}
                    />
              }
          </View>
        ) : (
          <Text 
            style={styles.noImageText}
          >
            {hasStep 
            ? (!!content?.length 
              ? 'Nenhuma imagem ou vídeo selecionado' 
              : 'Tire uma foto ou grave um vídeo')
            : 'Selecione uma etapa'}
          </Text>
        )}
      </View>


      {(isLoadingImgs && hasStep) 
        ? <Loading /> 
        : !!content?.length && (
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <FlatList
                horizontal
                renderItem={({item}) => <Item item={item} selectedImage={selectedImage} setSelectedImage={setSelectedImage}  />}
                keyExtractor={img => img?.video?.id || img?.image?.id}
                data={content}
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