import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {useBoolState} from '../../hooks/useBoolState';
import {QrCodeScanner} from '../QRCode/QrCodeScanner';
import {styles2} from '../../screens/Style';
import * as anchor from '@coral-xyz/anchor';
import {SendLogic} from './SendLogic';
import {mainStyle} from '../../../styles/style';
import {useTranslation} from 'react-i18next';
import {SendToPseudo} from './SendToPseudo';
import {getAddressFromPseudo} from '../../functions/solana/getAddressFromPseudo';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {
  isSelectedMintEquals,
  SelectedMint,
} from '../../functions/dlts/SelectedMint';
import {Button, View, XStack, YStack} from 'tamagui';
import {useMintAddresses, useMintDecimals} from '../../store/selectors';

const {height} = Dimensions.get('window');
const gapRatio = height * 0.01;

export function Send({
  selectedMint,
  setSelectedMint,
}: {
  selectedMint: SelectedMint;
  setSelectedMint: Dispatch<SetStateAction<SelectedMint>>;
}) {
  const [qrScannerActivated, activateQrScanner] = useBoolState();
  const [received, setReceived] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sentToPseudo, setSendToPseudo] = useState<boolean>(false);
  const {t} = useTranslation();
  const program = useAnchorProgram().program;
  const mint = useMintAddresses(
    selectedMint.dlt,
    selectedMint.wrapper,
    selectedMint.mint,
  );
  const decimals = useMintDecimals(
    selectedMint.dlt,
    selectedMint.wrapper,
    selectedMint.mint,
  );

  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>(
    'off',
  );

  const data: {
    pk: string;
    value: number;
    pseudo: string;
    selectedMint: SelectedMint;
  } | null = received ? JSON.parse(received) : null;

  const pk = useMemo(
    () => (data ? new anchor.web3.PublicKey(data.pk) : null),
    [data],
  );
  const value = data ? Number(data.value) : null;

  const pseudo = data ? data.pseudo : null;

  const setValueWithMint = (newValue: string) => {
    setReceived(newValue);
    const _selectedMint = (JSON.parse(newValue) as any)
      .selectedMint as SelectedMint;
    if (_selectedMint && !isSelectedMintEquals(_selectedMint, selectedMint)) {
      setSelectedMint(_selectedMint);
    }
  };

  useEffect(() => {
    if (pseudo && pk) {
      getAddressFromPseudo(pseudo, program).then(pubkey => {
        if (pubkey?.toBase58() !== pk?.toBase58()) {
          setError('Pseudo and address do not not match');
        }
      });
    }
  }, [pseudo, pk, program]);

  return (
    <YStack style={style.container} padding="$1" gap={5 * gapRatio}>
      {status === 'submitted' && (
        <View style={style.textContainer}>
          <Text style={style.submittedText}>
            {t('transactions:TransactionSubmitted')}
          </Text>
        </View>
      )}
      {pseudo && value && status !== 'submitted' && (
        // <Text>{`${t('Send')} ${value / 10 ** decimals} ${mint.name} ${t(
        //   'to',
        // )}: ${pseudo} ?`}</Text>
        <YStack gap={4 * gapRatio} style={{marginTop: 10}}>
          <XStack style={{flexDirection: 'row'}} gap={10 * widthRatio}>
            <Text style={style.text}>{t('Send')}</Text>
            <View style={{flex: 1}} />
            <Text style={style.values}>{`${value / 10 ** decimals} ${
              mint.name
            }`}</Text>
          </XStack>
          <XStack style={{flexDirection: 'row'}}>
            <Text style={style.text}>{t('to')}</Text>
            <View style={{flex: 1}} />
            <Text style={style.values}>{`${pseudo}`}</Text>
          </XStack>
        </YStack>
      )}

      {!error && data && pk && value && status !== 'submitted' && (
        <SendLogic
          pk={pk}
          value={value}
          setError={setError}
          {...selectedMint}
          status={status}
          setStatus={setStatus}
        />
      )}

      {error && <Text style={mainStyle.errorText}>{`${error}`}</Text>}

      {!qrScannerActivated && !sentToPseudo && !pseudo && !value && (
        <YStack gap={4 * gapRatio}>
          <Button
            style={styles2.button}
            onPress={() => {
              activateQrScanner();
              setError(null);
              setReceived(null);
            }}>
            <Text style={styles2.buttonText}>{t('Scan QR Code')}</Text>
          </Button>
          <Button style={styles2.button} onPress={() => setSendToPseudo(true)}>
            <Text style={styles2.buttonText}>{t('Send to Pseudo')}</Text>
          </Button>
        </YStack>
      )}

      {qrScannerActivated && (
        <QrCodeScanner exit={activateQrScanner} setValue={setValueWithMint} />
      )}

      {sentToPseudo && status !== 'submitted' && (
        <SendToPseudo
          error={error}
          setError={setError}
          selectedMint={selectedMint}
          status={status}
          setStatus={setStatus}
        />
      )}

      {/* <YStack justifyContent="flex-end">
        <Button onPress={() => closingFunction()}>{t('BackHome')}</Button>
      </YStack> */}
    </YStack>
  );
}

const widthRatio = Dimensions.get('window').width * 0.01;

const style = StyleSheet.create({
  submittedText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
    width: '100%',
    paddingTop: '10%',
  },
  textContainer: {
    textAlign: 'center',
    alignContent: 'center',
  },
  container: {
    width: '100%',
  },
  text: {
    fontWeight: '300',
    fontSize: 22 * height * 0.001,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    textAlign: 'left',
  },
  values: {
    fontWeight: '600',
    fontSize: 22 * height * 0.001,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    textAlign: 'right',
  },
});
