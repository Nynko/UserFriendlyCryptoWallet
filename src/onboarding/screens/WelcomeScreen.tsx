import {Dimensions, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import {Text, View} from 'tamagui';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../OnboardingMain';
import {useTranslation} from 'react-i18next';
import {GradientButtonStyled} from '../../components/Buttons/GradientButtonStyled/GradientButtonStyled';
import {onboardingStyle} from '../OnboardingStyle';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

const ALPHA = 0.1; // Low-pass filter coefficient

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen = ({navigation}: Props) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [sensorAvailable, setSensorAvailable] = useState(true);

  const {t} = useTranslation();

  const onNext = () => {
    navigation.navigate('Langues');
  };

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
      <View style={[onboardingStyle.container, StyleSheet.absoluteFill]}>
        <FastImage
          style={styles.circle}
          resizeMode="contain"
          source={require('../assets/Circles.png')}
        />
      </View>
      <View style={[onboardingStyle.container, StyleSheet.absoluteFill]}>
        <FastImage
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
          source={require('../assets/Home-mockup.png')}
        />
      </View>
      <View
        style={[
          onboardingStyle.container,
          StyleSheet.absoluteFill,
          onboardingStyle.index1,
        ]}>
        <Text style={[styles.redefineMoneyTransfersContainer]}>
          <Text style={styles.redefineMoneyTransfersWith}>
            {t('onboarding:RedefineMoneyTransfers')}
          </Text>
          {'\n'}
          <Text style={styles.blockchain}>blockchain.</Text>
        </Text>
      </View>
      <View style={[onboardingStyle.container, StyleSheet.absoluteFill]}>
        <FastImage
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
          source={require('../assets/Transactions-mockup.png')}
        />
      </View>
      <View
        style={[
          onboardingStyle.container,
          StyleSheet.absoluteFill,
          onboardingStyle.buttonContainer,
          onboardingStyle.index1,
        ]}>
        <GradientButtonStyled onPress={onNext}>
          <Text style={onboardingStyle.buttonText}>
            {t('onboarding:GetStarted')}
          </Text>
        </GradientButtonStyled>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});
