import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
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
import {ActiveComponent} from '../../types/components/ActiveComponent';
import {Button, YStack} from 'tamagui';
import {useMintAddresses, useMintDecimals} from '../../store/selectors';

export function Send({
  selectedMint,
  setSelectedMint,
  setActiveComponent,
}: {
  selectedMint: SelectedMint;
  setSelectedMint: Dispatch<SetStateAction<SelectedMint>>;
  setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
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
    <YStack padding="$1" gap="$4">
      {status === 'submitted' && <Text>{t('Transaction submitted')}</Text>}
      {pseudo && value && status !== 'submitted' && (
        <Text>{`${t('Send')} ${value / 10 ** decimals} ${mint.name} ${t(
          'to',
        )}: ${pseudo} ?`}</Text>
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
        <YStack gap="$2">
          <TouchableOpacity
            style={styles2.button}
            onPress={() => {
              activateQrScanner();
              setError(null);
              setReceived(null);
            }}>
            <Text style={styles2.buttonText}>{t('Scan QR Code')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles2.button}
            onPress={() => setSendToPseudo(true)}>
            <Text style={styles2.buttonText}>{t('Send to Pseudo')}</Text>
          </TouchableOpacity>
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

      <YStack flex={1} justifyContent="flex-end">
        <Button onPress={() => setActiveComponent(ActiveComponent.None)}>
          {t('BackHome')}
        </Button>
      </YStack>
    </YStack>
  );
}
