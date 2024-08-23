import * as anchor from '@coral-xyz/anchor';
import {ActivityIndicator, Button, TextInput} from 'react-native';
import {transferToken} from '../../functions/solana/transfer';
import {accessSolanaWallet} from '../../functions/wallet/solana_wallet';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {Dispatch, SetStateAction, useState} from 'react';
import {useAddresses} from '../../hooks/contexts/useAddresses';
import {APPROVER, EURC_MINT, WRAPPER_PDA} from '../../const';
import {getDeriveAddresses} from '../../functions/solana/getDerivedAddresses';
import {TOKEN_PROGRAM_ID} from '@coral-xyz/anchor/dist/cjs/utils/token';
import {TypedError} from '../../Errors/TypedError';
import {getAddressFromPseudo} from '../../functions/solana/getAddressFromPseudo';

export function SendToPseudo({
  reloadBalances,
  setError,
}: {
  reloadBalances: () => void;
  setError: Dispatch<SetStateAction<string | null>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [pseudo, setPseudo] = useState<string>('');

  const program = useAnchorProgram().program;
  const addresses = useAddresses();
  const mint = new anchor.web3.PublicKey(EURC_MINT);
  const wrapper = new anchor.web3.PublicKey(WRAPPER_PDA);
  const approver = new anchor.web3.PublicKey(APPROVER);

  async function getAndTransfer() {
    const pk = await getAddressFromPseudo(pseudo, program);
    console.log('send');

    console.log(pk);

    if (!pk) {
      setError('Pseudo not found');
      return;
    }
    const [destinationWrappedAccount, _destinationIdendity] =
      await getDeriveAddresses(mint, wrapper, pk, program);
    setLoading(true);
    accessSolanaWallet()
      .then(async signer => {
        return await transferToken(
          value,
          wrapper,
          signer,
          addresses.wrappedToken,
          pk,
          destinationWrappedAccount,
          addresses.twoAuth,
          addresses.twoAuthEntity,
          mint,
          approver,
          TOKEN_PROGRAM_ID,
          program,
        ).catch(e => {
          if (e instanceof TypedError) {
            setError(e.toString());
          } else {
            console.log(e);
            // Send to us the error
          }
        });
      })
      .then(() => {
        reloadBalances();
        setLoading(false);
      });
  }

  return (
    <>
      <TextInput placeholder="Pseudo" value={pseudo} onChangeText={setPseudo} />
      <TextInput
        placeholder="Amount"
        value={value.toString()}
        onChangeText={v => setValue(Number(v))}
      />
      <Button title="Confirm" onPress={getAndTransfer} />
      {loading && <ActivityIndicator />}
    </>
  );
}
