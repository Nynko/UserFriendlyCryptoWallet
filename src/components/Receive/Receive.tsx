import {Button, Text} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {NumericInput} from '../NumericInput';
import {useEffect, useState} from 'react';
import QRCode from 'react-qr-code';
import {useBoolState} from '../../hooks/useBoolState';
import {useTranslation} from 'react-i18next';
import {useAddresses} from '../../hooks/contexts/useAddresses';
import {accessValueUnlocked} from '../../functions/secrets';
import {KeychainElements} from '../../types/keychains';

export function Receive({
  isBalanceReloading,
  reloadBalances,
  pk,
}: {
  isBalanceReloading: boolean;
  reloadBalances: () => void;
  pk: anchor.web3.PublicKey;
}) {
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');
  const [presentation, setPresentation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qr, setQr] = useBoolState(false);

  const data = JSON.stringify([pk.toBase58(), Number(value), presentation]);

  const pseudo = useAddresses().pseudo;

  useEffect(() => {
    accessValueUnlocked(KeychainElements.AnoncredsMainPresentation).then(
      pres => {
        if (pres instanceof Error) {
          setError(pres.toString());
        } else {
          setPresentation(pres);
        }
      },
    );
  }, []);

  return (
    <>
      <NumericInput value={value} setValue={setValue} />
      <Text>{`${t('My Pseudo')} : ${pseudo}`} </Text>
      {presentation && <Button title={t('Receive money')} onPress={setQr} />}
      {qr && (
        <QRCode
          bgColor={'transparent'}
          size={150}
          value={JSON.stringify(data)}
        />
      )}
      {error && <Text>{error}</Text>}
    </>
  );
}
