import * as anchor from '@coral-xyz/anchor';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {Dispatch, SetStateAction, useState} from 'react';
import {getAddressFromPseudo} from '../../functions/solana/getAddressFromPseudo';
import {NumericInput} from '../inputs/NumericInput';
import {SelectedMint} from '../../functions/dlts/SelectedMint';
import {useDltAccount, useMintDecimals} from '../../store/selectors';
import {Button, Input, Spinner, YStack} from 'tamagui';
import {useTranslation} from 'react-i18next';
import {getDeriveAddresses} from '../../functions/solana/getDerivedAddresses';
import {accessSolanaWallet} from '../../functions/wallet/solana_wallet';
import {transferToken} from '../../functions/solana/transfer';
import {DLT} from '../../types/account';
import {TypedError} from '../../Errors/TypedError';
import {TOKEN_PROGRAM_ID} from '../../const';
import {useBoolStateTwoSet} from '../../hooks/useBoolState';
import {Dimensions, StyleSheet} from 'react-native';
import {styles2} from '../../screens/Style';

export function SendToPseudo({
  error,
  setError,
  selectedMint,
  status,
  setStatus,
}: {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  selectedMint: SelectedMint;
  status: 'off' | 'submitting' | 'submitted';
  setStatus: Dispatch<SetStateAction<'off' | 'submitting' | 'submitted'>>;
}) {
  const [value, setValue] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const {t} = useTranslation();
  const decimals = useMintDecimals(
    selectedMint.dlt,
    selectedMint.wrapper,
    selectedMint.mint,
  );

  const program = useAnchorProgram().program;
  const account = useDltAccount(DLT.SOLANA);
  const mintPk = new anchor.web3.PublicKey(selectedMint.mint);
  const wrapperPk = new anchor.web3.PublicKey(selectedMint.wrapper);
  const approver = account.wrappers[wrapperPk.toBase58()].addresses.approver;
  const [lock, setLock, unlock] = useBoolStateTwoSet();

  async function getAndTransfer(val: number) {
    const pubk = await getAddressFromPseudo(pseudo, program);
    if (!pubk) {
      setError(t('Pseudo not found'));
      setStatus('off');
      return;
    }
    const [destinationWrappedAccount, _destinationIdendity] =
      getDeriveAddresses(mintPk, wrapperPk, pubk, program);
    setStatus('submitting');
    accessSolanaWallet()
      .then(async signer => {
        return await transferToken(
          val,
          account.wrapperBalances[selectedMint.wrapper][selectedMint.mint]
            .decimals,
          wrapperPk,
          signer,
          account.wrappers[wrapperPk.toBase58()].mints[mintPk.toBase58()]
            .addresses.wrappedToken,
          pubk,
          destinationWrappedAccount,
          account.generalAddresses.twoAuth,
          account.generalAddresses.twoAuthEntity,
          mintPk,
          approver,
          TOKEN_PROGRAM_ID,
          program,
        );
      })
      .then(() => {
        setStatus('submitted');
      })
      .catch(e => {
        setStatus('off');
        if (e instanceof TypedError) {
          console.log(e.toStringComplete());
          setError(t(e.toString()));
          throw e;
        } else {
          console.log(e);
          setError(t('An error occured'));
          throw e;
          // Send to us the error
        }
      });
  }

  return (
    <YStack style={{alignItems: 'center'}} padding="$1" gap="$4">
      <Input
        placeholder="Pseudo"
        style={style.input}
        color={'black'}
        value={pseudo}
        onChangeText={text => {
          setPseudo(text);
          if (error) {
            setError(null);
          }
        }}
      />
      <NumericInput
        style={style.input}
        value={value}
        color={'black'}
        setValue={text => {
          setValue(text);
          if (error) {
            setError(null);
          }
        }}
      />

      <Button
        icon={status === 'submitting' ? () => <Spinner /> : undefined}
        style={styles2.button}
        onPress={() => {
          if (!lock) {
            setLock();
            getAndTransfer(Number(value) * 10 ** decimals).finally(unlock);
          }
        }}>
        {t('Send')}
      </Button>
    </YStack>
  );
}

const {height} = Dimensions.get('window');
const style = StyleSheet.create({
  input: {
    width: 200,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(132, 132, 132, 0.8)',
    fontSize: 16 * height * 0.001,
    fontFamily: 'Montserrat-Regular',
    // height: 40 * height * 0.001,
    // fontSize: 16 * height * 0.001,
    // fontFamily: 'Montserrat-Regular',
    // color: '#fff',
    // textAlign: 'left',
  },
  // pseudo: {
  //   fontWeight: '300',
  //   fontSize: 16 * height * 0.001,
  //   fontFamily: 'Montserrat-Regular',
  //   color: '#fff',
  //   textAlign: 'left',
  // },
  // value: {
  //   fontWeight: '300',
  //   fontSize: 16 * height * 0.001,
  //   fontFamily: 'Montserrat-Regular',
  //   textAlign: 'right',
  // },
});
