import {Dimensions, StyleSheet, Text} from 'react-native';
import {NumericInput} from '../inputs/NumericInput';
import {useState} from 'react';
import {useBoolState} from '../../hooks/useBoolState';
import {useTranslation} from 'react-i18next';
import {DLT} from '../../types/account';
import {appStore} from '../../store/zustandStore';
import QRCode from 'react-native-qrcode-svg';
import {SelectedMint} from '../../functions/dlts/SelectedMint';
import {Button, XStack, YStack} from 'tamagui';
import {styles2} from '../../screens/Style';
import {useMintDecimals, usePk} from '../../store/selectors';

export function Receive({selectedMint}: {selectedMint: SelectedMint}) {
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');
  const [qr, setQr] = useBoolState(false);
  const pk = usePk(DLT.SOLANA);
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
    <YStack padding="$4" gap="$5" alignItems="center" alignContent="center">
      <Text style={style.text}>{`${t('My Pseudo')} : ${pseudo}`}</Text>
      {!qr && (
        <XStack gap="$2" alignItems="center">
          <YStack alignItems="center" flex={1}>
            <NumericInput
              style={style.input}
              value={value}
              setValue={setValue}
              rightComponent={<Text style={style.text}>{mintName}</Text>}
            />
          </YStack>
        </XStack>
      )}

      {!qr && (
        <Button style={styles2.button} onPress={setQr}>
          <Text style={styles2.buttonText}>{t('GenerateQR')}</Text>
        </Button>
      )}
      {qr && (
        <YStack gap="$1" alignItems="center">
          <Text>{`${value} ${mintName}`}</Text>
          <QRCode backgroundColor={'transparent'} size={150} value={data} />
        </YStack>
      )}
    </YStack>
  );
}

const {width} = Dimensions.get('window');
const style = StyleSheet.create({
  input: {
    width: 200,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(132, 132, 132, 0.8)',
    fontSize: 40 * width * 0.001,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    // height: 40 * height * 0.001,
    // fontSize: 16 * height * 0.001,
    // fontFamily: 'Montserrat-Regular',
    // color: '#fff',
    // textAlign: 'left',
  },
  text: {
    fontSize: 40 * width * 0.001,
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
  },
  title: {
    fontSize: 40 * width * 0.001,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
});
