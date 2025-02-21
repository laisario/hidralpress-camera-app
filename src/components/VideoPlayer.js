import Video from 'react-native-video';
import { 
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import Loading from './Loading';
 

const VideoPlayer = ({video}) => {
  return (
    <View style={styles.container}>
      <Video 
        renderLoader={() => (
          <View>
            <Loading />
          </View>
        )}
        source={{
          uri: video,
          isNetwork: true
        }}
        shouldCache
        style={styles.video}
        controls
        resizeMode={'cover'}
      />
    </View>
  )
}
  
const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 250
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  video: {
    width: Dimensions.get('window').width * 0.9,
    height: (Dimensions.get('window').width * (16 / 9)) * 0.5,
    backgroundColor: 'black',
  }
});

export default VideoPlayer;
  
  