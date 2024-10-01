import {Text, View, YStack} from 'tamagui';
import {Dimensions, StyleSheet} from 'react-native';
import {GradientContoursComponent} from '../../GradientContoursComponent';
import {LastTransactions} from './LastTransactions';
import {useTranslation} from 'react-i18next';

export function HomeLastTransaction() {
  const {t} = useTranslation();
  return (
    <GradientContoursComponent
      borderWidth={1}
      linearGradientProps={{
        colors: ['#00FFB2', '#ffffff'],
        start: {x: 0, y: 0},
        end: {x: 1, y: 1},
        style: style.gradientBorder,
      }}
      Component={View}
      componentStyle={style.rectangle}
      componentProps={{}}>
      <YStack style={{flex: 1, padding: 10 * gapRatio}} gap={25 * gapRatio}>
        <Text style={style.title}>{`${t('MyLastTransactions')}:`}</Text>
        <View>
          <LastTransactions />
        </View>
      </YStack>
    </GradientContoursComponent>
  );
}

const {height, width} = Dimensions.get('window');
const borderRadius = 21;
const gapRatio = height * 0.001;
const style = StyleSheet.create({
  gradientBorder: {
    borderRadius: borderRadius,
    opacity: 0.5,
  },
  rectangle: {
    borderRadius: borderRadius,
    backgroundColor: 'rgba(45, 54, 45, 0.3)',
    width: width * 0.9,
    height: height * 0.22,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    top: height * 0.5,
  },
  index1: {
    zIndex: 1,
  },
  title: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 22 * height * 0.001,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
});
