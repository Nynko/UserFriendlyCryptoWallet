import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {NumericInput} from '../NumericInput';
import {useState} from 'react';
import {useBoolState} from '../../hooks/useBoolState';
import {useTranslation} from 'react-i18next';
import {DLT} from '../../types/account';
import {appStore} from '../../store/zustandStore';
import QRCode from 'react-native-qrcode-svg';

export function Receive({pk}: {pk: anchor.web3.PublicKey}) {
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');
  const [qr, setQr] = useBoolState(false);
  const pseudo = appStore(state => state.dlts[DLT.SOLANA].pseudo);

  const data = JSON.stringify({
    pk: pk.toBase58(),
    value: Number(Number(value) * 10 ** 2),
    pseudo,
  });

  return (
    <>
      {!qr && <NumericInput value={value} setValue={setValue} />}
      <Text style={{marginBottom: 10}}>{`${t('My Pseudo')} : ${pseudo}`} </Text>
      {!qr && <Button title={t('Receive money')} onPress={setQr} />}
      {qr && (
        <View style={{marginTop: 10}}>
          <QRCode backgroundColor={'transparent'} size={150} value={data} />
        </View>
      )}
    </>
  );
}
