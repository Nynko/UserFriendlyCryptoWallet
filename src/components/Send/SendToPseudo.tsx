import * as anchor from '@coral-xyz/anchor';
import {ActivityIndicator, Button, TextInput} from 'react-native';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {getAddressFromPseudo} from '../../functions/solana/getAddressFromPseudo';
import {useBoolStateOnce} from '../../hooks/useBoolState';
import {SendLogic} from './SendLogic';

export function SendToPseudo({
  setError,
}: {
  setError: Dispatch<SetStateAction<string | null>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [pseudo, setPseudo] = useState<string>('');
  const [send, setSendTrue] = useBoolStateOnce();
  const [pk, setPk] = useState<anchor.web3.PublicKey | null>(null);

  const program = useAnchorProgram().program;

  useEffect(() => {
    if (send) {
      setLoading(true);
      getAddressFromPseudo(pseudo, program)
        .then(setPk)
        .then(() => setLoading(false));
    }
  }, [program, pseudo, send]);

  return (
    <>
      <TextInput placeholder="Pseudo" value={pseudo} onChangeText={setPseudo} />
      <TextInput
        placeholder="Amount"
        value={value.toString()}
        onChangeText={v => setValue(Number(v))}
      />
      <Button title="Send?" onPress={setSendTrue} />
      {send && pk && (
        <SendLogic pk={pk} setError={setError} value={value * 10 ** 2} /> // TODO decimals
      )}
      {loading && <ActivityIndicator />}
    </>
  );
}
