import {Text, TouchableOpacity} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {NumericInput} from '../inputs/NumericInput';
import {Dispatch, SetStateAction, useState} from 'react';
import {useBoolState} from '../../hooks/useBoolState';
import {useTranslation} from 'react-i18next';
import {DLT} from '../../types/account';
import {appStore} from '../../store/zustandStore';
import QRCode from 'react-native-qrcode-svg';
import {SelectedMint} from '../../functions/dlts/SelectedMint';
import {ActiveComponent} from '../../types/components/ActiveComponent';
import {Button, XStack, YStack} from 'tamagui';
import {styles2} from '../../screens/Style';
import {typography} from '../../../styles/typography';
import {useMintDecimals} from '../../store/selectors';

export function Receive({
  pk,
  selectedMint,
  setActiveComponent,
}: {
  pk: anchor.web3.PublicKey;
  selectedMint: SelectedMint;
  setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
}) {
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');
  const [qr, setQr] = useBoolState(false);
  const decimals = useMintDecimals(
    DLT.SOLANA,
    selectedMint.wrapper,
    selectedMint.mint,
  );
  const pseudo = appStore(state => state.dlts[DLT.SOLANA].pseudo);
  const mintName = appStore(
    state =>
      state.dlts[DLT.SOLANA].wrappers[selectedMint.wrapper].mints[
        selectedMint.mint
      ].name,
  );

  const data = JSON.stringify({
    pk: pk.toBase58(),
    value: Number(Number(value) * 10 ** decimals),
    pseudo,
    selectedMint,
  });

  return (
    <YStack padding="$4" gap="$5" alignItems="center">
      <Text style={typography.thinSmaller}>{`${t(
        'My Pseudo',
      )} : ${pseudo}`}</Text>
      {!qr && (
        <XStack gap="$2" alignItems="center">
          <NumericInput value={value} setValue={setValue} />
          <Text style={typography.smallText}>{mintName}</Text>
        </XStack>
      )}

      {!qr && (
        <TouchableOpacity style={styles2.button} onPress={setQr}>
          <Text style={styles2.buttonText}>{t('Generate QR')}</Text>
        </TouchableOpacity>
      )}
      {qr && (
        <YStack gap="$1" alignItems="center">
          <Text>{`${value} ${mintName}`}</Text>
          <QRCode backgroundColor={'transparent'} size={150} value={data} />
        </YStack>
      )}

      <YStack flex={1} justifyContent="flex-end">
        <Button onPress={() => setActiveComponent(ActiveComponent.None)}>
          {t('BackHome')}
        </Button>
      </YStack>
    </YStack>
  );
}
