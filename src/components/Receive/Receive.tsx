import {Button, Text} from 'react-native';
import {accessAddress} from '../../functions/wallet/solana_wallet';
import * as anchor from '@coral-xyz/anchor';
import {NumericInput} from '../NumericInput';
import {useEffect, useState} from 'react';
import QRCode from 'react-qr-code';
import {useBoolState, useBoolStateOnce} from '../../hooks/useBoolState';
import {MINT_PUB, WRAPPER} from '../../tmp';
import {useGetPk} from '../../hooks/useGetPk';

export function Receive({
  isBalanceReloading,
  reloadBalances,
  pk,
}: {
  isBalanceReloading: boolean;
  reloadBalances: () => void;
  pk: anchor.web3.PublicKey;
}) {
  const [value, setValue] = useState<string>('');
  const [qr, setQr] = useBoolState(false);

  const data = JSON.stringify([pk.toBase58(), Number(value)]);

  return (
    <>
      <NumericInput value={value} setValue={setValue} />
      <Text>Receive to: {pk.toBase58()} </Text>
      <Button title="Receive money" onPress={setQr} />
      {qr && (
        <QRCode
          bgColor={'transparent'}
          size={150}
          value={JSON.stringify(data)}
        />
      )}
    </>
  );
}
