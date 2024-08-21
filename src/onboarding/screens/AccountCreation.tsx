import {Button, Text, TextInput, View} from 'react-native';
import {typography} from '../../../styles/typography';

import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IdentificationFormData, RootStackParamList} from '../OnboardingMain';
import {create_anoncreds} from '../functions/create_anoncreds';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {accessCredential} from '../../functions/accessAnoncreds';
import {create_account} from '../../functions/acccount_creation';

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

  console.log(identification);

  const onClick = async () => {
    await create_account(program.provider.connection);

    await create_anoncreds(
      {
        ...identification,
        dateOfBirth: identification.dateOfBirth.getTime().toString(),
      },
      anoncredsProgram,
    );
  };

  return (
    <>
      <Text style={typography.thinTitle}>This is Creation of anoncreds</Text>
      <View>
        <Button title="Next" onPress={onClick} />
      </View>
    </>
  );
}
