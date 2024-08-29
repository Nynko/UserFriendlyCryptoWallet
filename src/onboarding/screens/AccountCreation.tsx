import {Button, Text, View} from 'react-native';
import {typography} from '../../../styles/typography';
import {web3 as web3} from '@coral-xyz/anchor';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../OnboardingMain';
import {create_anoncreds} from '../functions/create_anoncreds';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {create_account} from '../functions/create_solana_account';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {useMMKV} from 'react-native-mmkv';
import {saveDltAccount} from '../../functions/accounts/mmkv-utils';
import {DLT, DltAccount} from '../../types/account';
import {APPROVER, EURC_MINT, WRAPPER_PDA} from '../../const';
import {getMintDecimals} from '../../functions/addresses/getMintDecimals';

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
  const mmkv = useMMKV();

  const onClick = async () => {
    const {
      pk,
      idendity,
      wrappedAccount,
      twoAuth,
      twoAuthEntity,
      recoveryAccount,
      pseudoAccount,
      pseudo,
    } = await create_account(identification.pseudo, program);
    await create_anoncreds(
      {
        ...identification,
        dateOfBirth: identification.dateOfBirth.getTime().toString(),
        solanaAddress: pk.toBase58(),
        solId: idendity.toBase58(),
      },
      anoncredsProgram,
    );
    const mint = new web3.PublicKey(EURC_MINT);

    const decimal_eurc = await getMintDecimals(
      mint,
      program.provider.connection,
    );
    const dltAccount: DltAccount = {
      dltName: DLT.SOLANA,
      generalAddresses: {
        pubKey: pk,
        pseudo,
        pseudoAccount,
        idendity,
        recovery: recoveryAccount,
        twoAuth,
        twoAuthEntity,
      },
      wrapperAddresses: {
        [WRAPPER_PDA]: {
          wrapperName: 'Main',
          wrapper: new web3.PublicKey(WRAPPER_PDA),
          wrappedToken: wrappedAccount,
          approver: new web3.PublicKey(APPROVER),
          mints: {
            EURC: {
              mintAddress: mint,
              mintMetadata: mint, // TODO find the proper mint metadata
              decimals: decimal_eurc,
            },
          },
        },
      },
    };
    saveDltAccount(DLT.SOLANA, dltAccount, mmkv);
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
