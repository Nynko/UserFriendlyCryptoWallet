import {Dimensions, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../OnboardingMain';
import {useTranslation} from 'react-i18next';
import {ChevronLeft} from '@tamagui/lucide-icons';
import {Button, View, YStack} from 'tamagui';
import {GradientButton} from '../../components/Buttons/GradientButton';
import {onboardingStyle} from '../OnboardingStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'Langues'>;

const {height, width} = Dimensions.get('window');
const gapRatio = height * 0.01;
const widthRatio = width * 0.01;

export function Langues({navigation}: Props) {
  const {t, i18n} = useTranslation();
  const onNext = () => {
    navigation.navigate('Idendification');
  };

  return (
    <>
      <ChevronLeft
        onPress={navigation.goBack}
        style={onboardingStyle.ChevronLeftIcon}
        size={13 * widthRatio} // 50
      />
      <YStack
        style={onboardingStyle.containerCenteredHorizontal}
        gap={15 * gapRatio}>
        <YStack style={onboardingStyle.titlesContainer} gap={6 * gapRatio}>
          <Text style={onboardingStyle.screenTitle}>{t('welcome')}</Text>
          <Text style={[onboardingStyle.subtitle]}>
            {t('onboarding:chooseLanguage')}
          </Text>
        </YStack>
        <YStack style={onboardingStyle.index1} gap="$10">
          <Button
            style={styles.langButton}
            onPress={() => {
              if (i18n.language !== 'en') {
                i18n.changeLanguage('en');
              }
            }}>
            <Text style={[styles.flag]}>EN</Text>
          </Button>
          <Button
            style={styles.langButton}
            onPress={() => {
              if (i18n.language !== 'fr') {
                i18n.changeLanguage('fr');
              }
            }}>
            <Text style={[styles.flag]}>FR</Text>
          </Button>
        </YStack>
      </YStack>
      <View
        style={[
          onboardingStyle.container,
          StyleSheet.absoluteFill,
          onboardingStyle.buttonContainer,
          onboardingStyle.index1,
        ]}>
        <GradientButton onPress={onNext}>
          <Text style={onboardingStyle.buttonText}>{t('next')}</Text>
        </GradientButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: '160%',
    height: '90%',
    top: '-5%',
    position: 'absolute',
  },
  langButton: {
    borderRadius: 7,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(235, 237, 248, 0.4)',
    backgroundColor: 'rgba(18, 17, 17, 0.17)',
    width: width * 0.75,
  },
  flag: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Montserrat-regular',
    textAlign: 'center',
  },
});
