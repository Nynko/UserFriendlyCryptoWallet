import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {typography} from '../../../styles/typography';

import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IdentificationFormData, RootStackParamList} from '../OnboardingMain';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

type PersonalInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Pseudo'
>;

export function Pseudo({navigation, route}: PersonalInfoScreenProps) {
  const {control, getValues} = useForm<IdentificationFormData>();
  const {t} = useTranslation();
  const {identification} = route.params;

  const onNext = () => {
    const data = getValues();
    navigation.navigate('AccountCreation', {
      identification: {...identification, ...data},
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={[typography.thinTitle, styles.center]}>
          {t('choosePseudo')}
        </Text>
        <Text style={[typography.titleText, styles.center, styles.spacing]}>
          {t('pseudoArePublic')}
        </Text>
        <View style={{marginTop: 40}}>
          <Text style={styles.center}>{t('choosePseudo')}</Text>
          <Controller
            control={control}
            name="pseudo"
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={{marginTop: 40}}>
          <Button title={t('next')} onPress={onNext} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
