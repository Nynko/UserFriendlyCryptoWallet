import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: width * 0.75, // Width of the camera view relative to the screen width
    height: width * 0.75, // Height of the camera view relative to the screen width
  },
});

export default styles;
