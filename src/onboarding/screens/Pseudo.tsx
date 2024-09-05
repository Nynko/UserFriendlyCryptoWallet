import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {typography} from '../../../styles/typography';

import {useForm, Controller} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IdentificationFormData, RootStackParamList} from '../OnboardingMain';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {useState} from 'react';
import {getAddressFromPseudo} from '../../functions/solana/getAddressFromPseudo';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {mainStyle} from '../../../styles/style';
import {TypedError} from '../../Errors/TypedError';

type PersonalInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Pseudo'
>;

export function Pseudo({navigation, route}: PersonalInfoScreenProps) {
  const program = useAnchorProgram().program;
  const {control, getValues} = useForm<IdentificationFormData>();
  const [error, setError] = useState<String | null>(null);
  const {t} = useTranslation();
  const {identification} = route.params;

  const onNext = async () => {
    const data = getValues();
    if (data.pseudo.length > 32) {
      setError(t('pseudoTooLong'));
      return;
    }
    try {
      const addr = await getAddressFromPseudo(data.pseudo, program);
      if (addr) {
        setError(t('pseudoAlreadyTaken'));
      } else {
        navigation.navigate('AccountCreation', {
          identification: {...identification, ...data},
        });
      }
    } catch (e) {
      if (e instanceof TypedError) {
        setError(t(e.toString()));
      } else {
        setError((e as Error).message);
      }
    }
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
                onChangeText={e => {
                  setError(null);
                  onChange(e);
                }}
                value={value}
              />
            )}
          />
          {error && (
            <Text style={[mainStyle.errorText, styles.center]}>{error}</Text>
          )}
        </View>
        <View style={{marginTop: 40}}>
          <Button title={t('next')} onPress={onNext} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
