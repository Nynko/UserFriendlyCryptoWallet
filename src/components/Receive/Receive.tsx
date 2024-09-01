import {Button, Text} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {NumericInput} from '../NumericInput';
import {useState} from 'react';
import QRCode from 'react-qr-code';
import {useBoolState} from '../../hooks/useBoolState';
import {useTranslation} from 'react-i18next';
import {DLT} from '../../types/account';
import {appStore} from '../../store/zustandStore';

export function Receive({
  pk,
}: {
  reloadBalances: () => void;
  pk: anchor.web3.PublicKey;
}) {
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');
  const [qr, setQr] = useBoolState(false);
  const pseudo = appStore(state => state.dlts[DLT.SOLANA].pseudo);
  const data = JSON.stringify([pk.toBase58(), Number(value), pseudo]);

  return (
    <>
      {!qr && <NumericInput value={value} setValue={setValue} />}
      <Text style={{marginBottom: 10}}>{`${t('My Pseudo')} : ${pseudo}`} </Text>
      {!qr && <Button title={t('Receive money')} onPress={setQr} />}
      {qr && (
        <QRCode
          bgColor={'transparent'}
          size={150}
          value={JSON.stringify(data)}
          style={{marginTop: 10}}
        />
      )}
    </>
  );
}
