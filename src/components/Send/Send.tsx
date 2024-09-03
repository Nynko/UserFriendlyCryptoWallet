import {useEffect, useMemo, useState} from 'react';
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

export function Send() {
  const [qrScannerActivated, activateQrScanner] = useBoolState();
  const [reiceved, setReceived] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sentToPseudo, setSendToPseudo] = useState<boolean>(false);
  const {t} = useTranslation();
  const program = useAnchorProgram().program;

  const data: {pk: string; value: number; pseudo: string} | null = reiceved
    ? JSON.parse(reiceved)
    : null;

  const pk = useMemo(
    () => (data ? new anchor.web3.PublicKey(data.pk) : null),
    [data],
  );
  const value = data ? Number(data.value) : null;

  const pseudo = data ? data.pseudo : null;

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
    <>
      {pseudo && <Text>{`${t('Send to')} : ${pseudo} ?`}</Text>}
      {!error && data && pk && value && (
        <SendLogic pk={pk} value={value} setError={setError} />
      )}
      {error && <Text style={mainStyle.errorText}>{`${error}`}</Text>}
      {!qrScannerActivated && !sentToPseudo && (
        <>
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
        </>
      )}

      {qrScannerActivated && (
        <QrCodeScanner exit={activateQrScanner} setValue={setReceived} />
      )}
      {sentToPseudo && <SendToPseudo setError={setError} />}
    </>
  );
}
