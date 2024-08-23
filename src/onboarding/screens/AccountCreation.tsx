import {Button, Text, View} from 'react-native';
import {typography} from '../../../styles/typography';

import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../OnboardingMain';
import {create_anoncreds} from '../functions/create_anoncreds';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {create_account} from '../functions/create_solana_account';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AccountCreation'
>;

type PersonalInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  'AccountCreation'
>;

interface AccountCreationProps {
  navigation: PersonalInfoScreenNavigationProp;
  route: PersonalInfoScreenRouteProp;
  reload: () => void;
}

export function AccountCreation({route, reload}: AccountCreationProps) {
  const programs = useAnchorProgram();
  const anoncredsProgram = programs.anoncredsProgram;
  const program = programs.program;
  const {identification} = route.params;
  const {t} = useTranslation();

  const onClick = async () => {
    const {pk, id} = await create_account(identification.pseudo, program);
    await create_anoncreds(
      {
        ...identification,
        dateOfBirth: identification.dateOfBirth.getTime().toString(),
        solanaAddress: pk.toBase58(),
        solId: id.toBase58(),
      },
      anoncredsProgram,
    );
    reload();
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
