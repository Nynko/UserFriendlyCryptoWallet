import * as anchor from '@coral-xyz/anchor';
import {ActivityIndicator, Button} from 'react-native';
import {transferToken} from '../../functions/solana/transfer';
import {accessSolanaWallet} from '../../functions/wallet/solana_wallet';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {Dispatch, SetStateAction, useState} from 'react';
import {APPROVER, EURC_MINT, WRAPPER_PDA} from '../../const';
import {getDeriveAddresses} from '../../functions/solana/getDerivedAddresses';
import {TOKEN_PROGRAM_ID} from '@coral-xyz/anchor/dist/cjs/utils/token';
import {TypedError} from '../../Errors/TypedError';
import {DLT, Transaction} from '../../types/account';
import {useTranslation} from 'react-i18next';
import {appStore} from '../../store/zustandStore';
import {produce} from 'immer';
import {useDltAccount} from '../../store/selectors';
export function SendLogic({
  pk,
  value,
  reloadBalances,
  setError,
}: {
  pk: anchor.web3.PublicKey;
  value: number;
  reloadBalances: () => void;
  setError: Dispatch<SetStateAction<string | null>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const {t} = useTranslation();
  const program = useAnchorProgram().program;
  const account = useDltAccount(DLT.SOLANA);

  const setTransactions = (transaction: Transaction) =>
    appStore.setState(state =>
      produce(state, draftState => {
        draftState.dlts[DLT.SOLANA].transactions.push(transaction);
      }),
    );

  const mint = new anchor.web3.PublicKey(EURC_MINT);
  const wrapper = new anchor.web3.PublicKey(WRAPPER_PDA);
  const approver = new anchor.web3.PublicKey(APPROVER);
  async function getAndTransfer() {
    const [destinationWrappedAccount, _destinationIdendity] =
      await getDeriveAddresses(mint, wrapper, pk, program);
    setLoading(true);
    setError(null);
    accessSolanaWallet()
      .then(async signer => {
        return await transferToken(
          value,
          2,
          wrapper,
          signer,
          account.wrappers[wrapper.toBase58()].mints[mint.toBase58()].addresses
            .wrappedToken,
          pk,
          destinationWrappedAccount,
          account.generalAddresses.twoAuth,
          account.generalAddresses.twoAuthEntity,
          mint,
          approver,
          TOKEN_PROGRAM_ID,
          program,
        );
      })
      .then(tx => {
        reloadBalances();
        setTransactions(tx);
        setLoading(false);
      })
      .catch(e => {
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
      <Button title="Confirm" onPress={getAndTransfer} />
      {loading && <ActivityIndicator />}
    </>
  );
}
