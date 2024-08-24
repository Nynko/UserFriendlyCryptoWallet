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

interface SendProps {
  isBalanceReloading: boolean;
  reloadBalances: () => void;
}

export function Send(props: SendProps) {
  const [qrScannerActivated, activateQrScanner] = useBoolState();
  const [reiceved, setReceived] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sentToPseudo, setSendToPseudo] = useState<boolean>(false);
  const {t} = useTranslation();
  const program = useAnchorProgram().program;

  const data = reiceved ? JSON.parse(reiceved) : null;

  const pk = useMemo(
    () => (data ? new anchor.web3.PublicKey(JSON.parse(data)[0]) : null),
    [data],
  );
  const value = data ? Number(JSON.parse(data)[1]) : null;
  const pseudo = data ? JSON.parse(data)[2] : null;

  useEffect(() => {
    setError(null);
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
        <SendLogic
          pk={pk}
          value={value}
          reloadBalances={props.reloadBalances}
          setError={setError}
        />
      )}
      {error && <Text style={mainStyle.errorText}>{t(error)}</Text>}
      {!qrScannerActivated && !sentToPseudo && (
        <>
          <TouchableOpacity style={styles2.button} onPress={activateQrScanner}>
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
      {sentToPseudo && (
        <SendToPseudo
          reloadBalances={props.reloadBalances}
          setError={setError}
        />
      )}
    </>
  );
}
