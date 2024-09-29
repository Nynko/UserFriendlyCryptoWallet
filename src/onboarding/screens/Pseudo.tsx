import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {web3 as web3} from '@coral-xyz/anchor';
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
import {ChevronLeft} from '@tamagui/lucide-icons';
import {onboardingStyle} from '../OnboardingStyle';
import {KeyboardDismissPressable} from '../../components/KeyboardDismiss';
import {Input, YStack} from 'tamagui';
import {GradientButtonStyled} from '../../components/Buttons/GradientButtonStyled/GradientButtonStyled';
import {
  commitAccount,
  create_account,
} from '../functions/create_solana_account';
import {create_anoncreds} from '../functions/create_anoncreds';
import {getMintDecimals} from '../../functions/addresses/getMintDecimals';
import {APPROVER, EURC_MINT, NATIVE_MINT, WRAPPER_PDA} from '../../const';
import {getWrappedTokenAddress} from '../../functions/solana/getDerivedAddresses';
import {DLT, DltAccount} from '../../types/account';
import {appStore} from '../../store/zustandStore';
import {produce} from 'immer';

type PersonalInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Pseudo'
>;

const {width, height} = Dimensions.get('window');
const gapRatio = height * 0.01;
const widthRatio = width * 0.01;

export function Pseudo({navigation, route}: PersonalInfoScreenProps) {
  const programs = useAnchorProgram();
  const program = programs.program;
  const anoncredsProgram = programs.anoncredsProgram;
  const {control, getValues} = useForm<IdentificationFormData>();
  const [error, setError] = useState<String | null>(null);
  const {t} = useTranslation();
  const {identification} = route.params;

  const onNext = async () => {
    const data = getValues();
    if (!data.pseudo) {
      setError(t('onboarding:pseudoRequired'));
      return;
    }
    if (data.pseudo.length > 32) {
      setError(t('pseudoTooLong'));
      return;
    }
    try {
      const addr = await getAddressFromPseudo(data.pseudo, program);
      if (addr) {
        setError(t('pseudoAlreadyTaken'));
      } else {
        await createAcc({...identification, ...data});
        // navigation.navigate('AccountCreation', {
        //   identification: {...identification, ...data},
        // });
      }
    } catch (e) {
      if (e instanceof TypedError) {
        setError(t(e.toString()));
      } else {
        setError((e as Error).message);
      }
    }
  };

  const createAcc = async (data: IdentificationFormData) => {
    const {
      transaction,
      signer,
      pk,
      idendity,
      wrappedAccount,
      twoAuth,
      twoAuthEntity,
      recoveryAccount,
      pseudoAccount,
      pseudo,
    } = await create_account(data.pseudo, program);
    await create_anoncreds(
      {
        ...data,
        dateOfBirth: data.dateOfBirth.getTime().toString(),
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

    const nativeWrappedToken = getWrappedTokenAddress(
      NATIVE_MINT,
      new web3.PublicKey(WRAPPER_PDA),
      pk,
      program,
    );

    const dltAccount: DltAccount = {
      pseudo,
      prices: {
        [EURC_MINT]: 1,
        [NATIVE_MINT.toBase58()]: 0,
      },
      generalAddresses: {
        pubKey: pk,
        pseudoAccount,
        idendity,
        recovery: recoveryAccount,
        twoAuth,
        twoAuthEntity,
      },
      transactions: [],
      nativeBalance: 0n,
      nativeTokenName: 'SOL',
      wrapperBalances: {
        [WRAPPER_PDA]: {
          [mint.toBase58()]: {
            decimals: decimal_eurc,
            balance: 0n,
          },
          [NATIVE_MINT.toBase58()]: {
            decimals: 9,
            balance: 0n,
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
            [NATIVE_MINT.toBase58()]: {
              name: 'SOL',
              addresses: {
                wrappedToken: nativeWrappedToken,
                mintAddress: NATIVE_MINT,
                mintMetadata: web3.PublicKey.default,
              },
            },
          },
        },
      },
    };

    appStore.setState(state =>
      produce(state, draftState => {
        draftState.initialized = true;
        draftState.dlts[DLT.SOLANA] = dltAccount;
      }),
    );

    commitAccount(transaction, signer, twoAuthEntity, program).catch(e => {
      console.log(e);
      // Rollback state if the commit fails
      const init = appStore.getInitialState();
      appStore.setState(init);
      throw e;
    });
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
        <YStack style={onboardingStyle.titlesContainer} gap={6 * gapRatio}>
          <Text style={[onboardingStyle.screenTitle, styles.center]}>
            {t('onboarding:choosePseudo')}
          </Text>
          <Text style={[onboardingStyle.subtitle]}>
            {t('onboarding:pseudoArePublicAndUnique')}
          </Text>
        </YStack>
        <YStack style={onboardingStyle.inputContainer}>
          <Controller
            control={control}
            name="pseudo"
            render={({field: {onChange, value}}) => (
              <Input
                placeholder={'Pseudo'}
                placeholderTextColor={'rgba(235, 237, 248, 0.4)'}
                borderWidth={2}
                borderColor={'rgba(235, 237, 248, 0.4)'}
                borderRadius={7}
                style={onboardingStyle.input}
                onChangeText={e => {
                  setError(null);
                  onChange(e);
                }}
                value={value}
              />
            )}
          />
          <YStack margin={2 * gapRatio}>
            {error && (
              <Text style={[mainStyle.errorText, styles.center]}>{error}</Text>
            )}
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
        <GradientButtonStyled onPress={onNext}>
          <Text style={onboardingStyle.buttonText}>{t('next')}</Text>
        </GradientButtonStyled>
      </View>
      {/* <View style={styles.container}>
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
      </View> */}
    </KeyboardDismissPressable>
  );
}
