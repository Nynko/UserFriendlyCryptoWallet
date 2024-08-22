import {Button, Text, TextInput, View} from 'react-native';
import {typography} from '../../../styles/typography';

import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IdentificationFormData, RootStackParamList} from '../OnboardingMain';
import {create_anoncreds} from '../functions/create_anoncreds';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {accessCredential} from '../../functions/accessAnoncreds';
import {create_account} from '../functions/create_solana_account';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {useAddresses} from '../../hooks/contexts/useAddresses';

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AccountCreation'
>;

type PersonalInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  'AccountCreation'
>;

interface PersonalInfoScreenProps {
  navigation: PersonalInfoScreenNavigationProp;
  route: PersonalInfoScreenRouteProp;
}

export function AccountCreation({navigation, route}: PersonalInfoScreenProps) {
  const programs = useAnchorProgram();
  const anoncredsProgram = programs.anoncredsProgram;
  const program = programs.program;
  const {control, handleSubmit, getValues} = useForm<IdentificationFormData>();
  const {identification} = route.params;
  const {t} = useTranslation();

  const onClick = async () => {
    const pk = await create_account(program.provider.connection);
    await create_anoncreds(
      {
        ...identification,
        dateOfBirth: identification.dateOfBirth.getTime().toString(),
        solanaAddress: pk.toBase58(),
      },
      anoncredsProgram,
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[typography.thinTitle, styles.center]}>
          {t('accountCreation')}
        </Text>
        <View>
          <Button title="Next" onPress={onClick} />
        </View>
      </View>
    </>
  );
}
