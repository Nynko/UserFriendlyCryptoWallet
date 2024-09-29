import {Dimensions, StyleSheet} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IdentificationFormData, RootStackParamList} from '../OnboardingMain';
import DatePicker from 'react-native-date-picker';

type PersonalInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Idendification'
>;
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {useState} from 'react';
import {ChevronLeft} from '@tamagui/lucide-icons';
import {onboardingStyle} from '../OnboardingStyle';
import {Button, Input, Text, View, YStack} from 'tamagui';
import {GradientButton} from '../../components/Buttons/GradientButton';
import {KeyboardDismissPressable} from '../../components/KeyboardDismiss';

const {width, height} = Dimensions.get('window');
const gapRatio = height * 0.01;
const widthRatio = width * 0.01;

export function Idendification({navigation}: PersonalInfoScreenProps) {
  const {control, getValues} = useForm<IdentificationFormData>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  const onNext = () => {
    const data = getValues();
    navigation.navigate('Pseudo', {identification: data});
  };

  return (
    <KeyboardDismissPressable>
      <ChevronLeft
        onPress={navigation.goBack}
        style={onboardingStyle.ChevronLeftIcon}
        size={13 * widthRatio} // 50
      />
      <YStack
        style={onboardingStyle.containerCenteredHorizontal}
        gap={10 * gapRatio}>
        <YStack style={onboardingStyle.titlesContainer}>
          <Text style={[onboardingStyle.screenTitle, styles.center]}>
            {t('onboarding:accountCreation')}
          </Text>
        </YStack>
        <YStack gap={4 * gapRatio}>
          <YStack style={onboardingStyle.inputContainer}>
            <Text style={onboardingStyle.textAboveInput}>{t('lastName')}</Text>
            <Controller
              control={control}
              name="lastName"
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder={t('lastName')}
                  placeholderTextColor={'rgba(235, 237, 248, 0.4)'}
                  borderWidth={2}
                  borderColor={'rgba(235, 237, 248, 0.4)'}
                  borderRadius={7}
                  style={onboardingStyle.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </YStack>
          <YStack style={onboardingStyle.inputContainer}>
            <Text style={onboardingStyle.textAboveInput}>{t('firstName')}</Text>
            <Controller
              control={control}
              name="firstName"
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder={t('firstName')}
                  placeholderTextColor={'rgba(235, 237, 248, 0.4)'}
                  borderWidth={2}
                  borderColor={'rgba(235, 237, 248, 0.4)'}
                  borderRadius={7}
                  style={onboardingStyle.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </YStack>
          <YStack style={onboardingStyle.inputContainer}>
            <Text style={onboardingStyle.textAboveInput}>
              {t('dateOfBirth')}
            </Text>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({field: {onChange, value}}) => (
                <>
                  <Button
                    borderWidth={2}
                    borderColor={'rgba(235, 237, 248, 0.4)'}
                    borderRadius={7}
                    style={onboardingStyle.input}
                    onPress={() => {
                      setOpen(true);
                    }}>
                    <Text>
                      {value ? value.toLocaleDateString() : t('clickHere')}
                    </Text>
                  </Button>
                  <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                      onChange(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </>
              )}
            />
          </YStack>
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
    </KeyboardDismissPressable>
  );
}
