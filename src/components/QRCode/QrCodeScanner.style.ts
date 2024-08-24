import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: width * 0.8, // Width of the camera view relative to the screen width
    height: width * 0.8, // Height of the camera view relative to the screen width
    borderRadius: 10, // Optional: to make the corners rounded
  },
});

export default styles;
