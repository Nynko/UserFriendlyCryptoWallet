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
import {APPROVER, EURC_MINT, WRAPPER_PDA} from '../../const';
import {getMintDecimals} from '../../functions/addresses/getMintDecimals';
import {appStore} from '../../store/zustandStore';
import {DLT, DltAccount} from '../../types/account';
import {produce} from 'immer';

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
      pseudo,
      generalAddresses: {
        pubKey: pk,
        pseudoAccount,
        idendity,
        recovery: recoveryAccount,
        twoAuth,
        twoAuthEntity,
      },
      transactions: [],
      nativeBalance: 0,
      wrapperBalances: {
        [WRAPPER_PDA]: {
          [mint.toBase58()]: {
            decimals: decimal_eurc,
            balance: 0,
          },
        },
      },
      wrappers: {
        [WRAPPER_PDA]: {
          wrapperName: 'Main',
          addresses: {
            approver: new web3.PublicKey(APPROVER),
            wrapper: new web3.PublicKey(WRAPPER_PDA),
          },
          mints: {
            [mint.toBase58()]: {
              name: 'EURC',
              addresses: {
                wrappedToken: wrappedAccount,
                mintAddress: mint,
                mintMetadata: web3.PublicKey.default, // TODO find the proper mint metadata
              },
            },
          },
        },
      },
    };
    appStore.setState(state =>
      produce(state, draftState => {
        draftState.dlts[DLT.SOLANA] = dltAccount;
      }),
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
