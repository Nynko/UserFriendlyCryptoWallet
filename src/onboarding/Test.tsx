import {Dimensions, Image, StyleSheet} from 'react-native';
import HomeMockup from './assets/Home-mockup.png';
import TransactionMockup from './assets/Transactions-mockup.png';
import BackgroundImage from './assets/Background/Background.png';
import TestCircles from './assets/TestCircle2.png';
import {useEffect, useState} from 'react';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import {Button, Text, View} from 'tamagui';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const {width, height} = Dimensions.get('window');

const ALPHA = 0.1; // Low-pass filter coefficient

const borderWidth = 1;
const borderRadius = 27;

const LaunchingScreen = () => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [sensorAvailable, setSensorAvailable] = useState(true);

  useEffect(() => {
    try {
      setUpdateIntervalForType(SensorTypes.accelerometer, 16); // Update every 16ms (~60fps)
      let lastX = 0;
      let lastY = 0;
      const subscription = accelerometer
        .pipe(
          map(({x, y}) => {
            // Apply low-pass filter
            const filteredX = lastX + ALPHA * (x - lastX);
            const filteredY = lastY + ALPHA * (y - lastY);
            lastX = filteredX;
            lastY = filteredY;
            return {
              x: filteredX * 10,
              y: filteredY * 10,
            };
          }),
          filter(({x, y}) => x !== null && y !== null),
        )
        .subscribe(setPosition, error => {
          console.error(error);
          setSensorAvailable(false);
        });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error(error);
      setSensorAvailable(false);
    }
  }, []);
  return (
    <>
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <Image resizeMode="cover" source={BackgroundImage} />
      </View>
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <Image
          style={styles.circle}
          resizeMode="contain"
          source={TestCircles}
        />
      </View>
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <Image
          style={[
            styles.homeMockupIcon,
            sensorAvailable && {
              transform: [
                {translateX: position.x * 2},
                {translateY: position.y * 2},
              ],
            },
          ]}
          resizeMode="contain"
          source={HomeMockup}
        />
      </View>
      <View style={[styles.container, StyleSheet.absoluteFill, styles.index1]}>
        <Text style={[styles.redefineMoneyTransfersContainer]}>
          <Text style={styles.redefineMoneyTransfersWith}>
            {'Redefine money transfers with the \npower of'}
          </Text>
          {'\n'}
          <Text style={styles.blockchain}>blockchain.</Text>
        </Text>
      </View>
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <Image
          style={[
            styles.transactionsMockupIcon,
            sensorAvailable && {
              transform: [
                {translateX: position.x * -2},
                {translateY: position.y * -2},
              ],
            },
          ]}
          resizeMode="contain"
          source={TransactionMockup}
        />
      </View>
      <View
        style={[
          styles.container,
          StyleSheet.absoluteFill,
          styles.buttonContainer,
          styles.index1,
        ]}>
        <MaskedView
          maskElement={
            <Button
              style={[styles.buttonBorder, {backgroundColor: 'transparent'}]}
            />
          }>
          <LinearGradient
            colors={['#FFFAFA', '#00C0D9']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorder}>
            <Button style={styles.button} />
          </LinearGradient>
        </MaskedView>
      </View>
      <View
        style={[
          styles.container,
          StyleSheet.absoluteFill,
          styles.buttonContainer,
        ]}>
        <Button style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: '160%',
    height: '90%',
    top: '-5%',
    position: 'absolute',
  },
  homeMockupIcon: {
    top: height * 0.3,
    left: width * -0.15,
    width: width * 0.6,
    height: height * 0.6,
    position: 'absolute',
  },
  transactionsMockupIcon: {
    top: height * 0.2,
    left: width * 0.5,
    width: width * 0.6,
    height: height * 0.6,
    position: 'absolute',
  },
  index1: {
    zIndex: 1,
  },
  redefineMoneyTransfersContainer: {
    top: height * -0.02,
    left: width * 0.05,
    fontSize: 50 * height * 0.001,
    textAlign: 'left',
    width: width * 0.9,
    height: height * 0.6,
  },
  redefineMoneyTransfersWith: {
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  blockchain: {
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  buttonContainer: {
    top: height * 0.7,
  },
  buttonBorder: {
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderColor: '#ffffff',
    borderWidth: borderWidth,
    width: width * 0.5,
  },
  button: {
    borderRadius: borderRadius,
    backgroundColor: 'rgba(18, 17, 17, 0.4)',
    borderWidth: 0,
    width: width * 0.5,
    marginTop: -borderWidth,
    marginLeft: -borderWidth,
  },
  buttonMask: {
    // height: '100%',
    // top: '0%',
    // right: '0%',
    // bottom: '0%',
    // left: '0%',
    borderRadius: borderRadius,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: '#ffffff',
    borderWidth: borderWidth,
    width: width * 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16 * height * 0.001,
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
  },
  gradientBorder: {
    borderRadius: borderRadius,
    padding: 1,
  },
  buttonWrapper: {
    borderRadius: borderRadius,
    backgroundColor: 'transparent',
  },
  maskedView: {
    width: width * 0.5 + 6, // Adjust width to include border
    height: 50 + 6, // Adjust height to include border
    borderRadius: 27 + 3, // Adjust border radius to include border
  },
  // maskContainer: {
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: 27,
  //   backgroundColor: 'black',
  // },
});

export default LaunchingScreen;
