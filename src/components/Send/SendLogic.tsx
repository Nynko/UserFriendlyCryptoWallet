import * as anchor from '@coral-xyz/anchor';
import {transferToken} from '../../functions/solana/transfer';
import {accessSolanaWallet} from '../../functions/wallet/solana_wallet';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {Dispatch, SetStateAction} from 'react';
import {getDeriveAddresses} from '../../functions/solana/getDerivedAddresses';
import {TOKEN_PROGRAM_ID} from '@coral-xyz/anchor/dist/cjs/utils/token';
import {TypedError} from '../../Errors/TypedError';
import {DLT} from '../../types/account';
import {useTranslation} from 'react-i18next';
import {useDltAccount} from '../../store/selectors';
import {Button, Spinner} from 'tamagui';
import {useBoolStateTwoSet} from '../../hooks/useBoolState';

export function SendLogic({
  pk,
  value,
  setError,
  mint,
  wrapper,
  status,
  setStatus,
}: {
  pk: anchor.web3.PublicKey;
  value: number;
  setError: Dispatch<SetStateAction<string | null>>;
  mint: string;
  wrapper: string;
  status: 'off' | 'submitting' | 'submitted';
  setStatus: Dispatch<SetStateAction<'off' | 'submitting' | 'submitted'>>;
}) {
  const {t} = useTranslation();
  const program = useAnchorProgram().program;
  const account = useDltAccount(DLT.SOLANA);
  const [lock, setLock, unlock] = useBoolStateTwoSet();
  const mintPk = new anchor.web3.PublicKey(mint);
  const wrapperPk = new anchor.web3.PublicKey(wrapper);
  const approver = account.wrappers[wrapperPk.toBase58()].addresses.approver;
  async function getAndTransfer() {
    const [destinationWrappedAccount, _destinationIdendity] =
      getDeriveAddresses(mintPk, wrapperPk, pk, program);
    setStatus('submitting');
    accessSolanaWallet()
      .then(async signer => {
        return await transferToken(
          value,
          account.wrapperBalances[wrapper][mint].decimals,
          wrapperPk,
          signer,
          account.wrappers[wrapperPk.toBase58()].mints[mintPk.toBase58()]
            .addresses.wrappedToken,
          pk,
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
          // Send to us the error
        }
      });
  }

  return (
    <>
      <Button
        icon={status === 'submitting' ? () => <Spinner /> : undefined}
        onPress={() => {
          if (!lock) {
            setLock();
            getAndTransfer().finally(unlock);
          }
        }}>
        {t('Send')}
      </Button>
    </>
  );
}
