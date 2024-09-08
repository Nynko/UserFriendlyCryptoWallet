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
        } else {
          console.log(e);
          setError(t('An error occured'));

          // Send to us the error
        }
      });
  }

  return (
    <YStack padding="$1" gap="$4">
      <Input
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={text => {
          setPseudo(text);
          if (error) {
            setError(null);
          }
        }}
      />
      <NumericInput
        value={value}
        setValue={text => {
          setValue(text);
          if (error) {
            setError(null);
          }
        }}
      />
      {value && (
        <Button
          icon={status === 'submitting' ? () => <Spinner /> : undefined}
          onPress={() => getAndTransfer(Number(value) * 10 ** decimals)}>
          {t('Send')}
        </Button>
      )}
    </YStack>
  );
}
