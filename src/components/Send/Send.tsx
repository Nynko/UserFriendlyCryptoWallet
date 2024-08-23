import {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useBoolState} from '../../hooks/useBoolState';
import {QrCodeScanner} from '../QRCode/QrCodeScanner';
import {styles2} from '../../screens/Style';
import * as anchor from '@coral-xyz/anchor';
import {SendLogic} from './SendLogic';
import {mainStyle} from '../../../styles/style';
import {useTranslation} from 'react-i18next';
import {SendToPseudo} from './SendToPseudo';
import {
  JsonObject,
  Presentation,
  PresentationRequest,
  Schema,
} from '@hyperledger/anoncreds-react-native';
import {verifyPresentation} from '../../functions/anoncreds/createPresentations';
import {accessValueUnlocked} from '../../functions/secrets';
import {KeychainElements} from '../../types/keychains';
import {AnoncredsDefinitions} from '../../onboarding/functions/create_anoncreds';

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

  const data = reiceved ? JSON.parse(reiceved) : null;

  const pk = data ? new anchor.web3.PublicKey(JSON.parse(data)[0]) : null;
  const value = data ? Number(JSON.parse(data)[1]) : null;
  const presentation = data ? Presentation.fromJson(JSON.parse(data)[2]) : null;

  const solId = presentation
    ? (presentation.toJson() as any).requested_proof.revealed_attr_groups.infos
        .values.solId.raw
    : null;
  const firstName = presentation
    ? (presentation.toJson() as any).requested_proof.revealed_attr_groups.infos
        .values.firstName.raw
    : null;
  const lastName = presentation
    ? (presentation.toJson() as any).requested_proof.revealed_attr_groups.infos
        .values.lastName.raw
    : null;
  const pseudo = presentation
    ? (presentation.toJson() as any).requested_proof.revealed_attr_groups.infos
        .values.pseudo.raw
    : null;
  const address = presentation
    ? (presentation.toJson() as any).requested_proof.revealed_attr_groups.infos
        .values.address.raw
    : null;

  console.log(address);
  console.log(solId);

  useEffect(() => {
    accessValueUnlocked(KeychainElements.AnoncredsDefinitions)
      .then(def => {
        if (def instanceof Error) {
          setError(def.toString());
        } else {
          const {
            schema: schemaStr,
            schemaId,
            credDefId,
            credDef: credDefStr,
            mainPresentationRequest: pres,
          } = JSON.parse(def);
          const schema = Schema.fromJson(schemaStr as unknown as JsonObject);
          const credDef = Schema.fromJson(credDefStr as unknown as JsonObject);
          const mainPresentationRequest = PresentationRequest.fromJson(
            pres as unknown as JsonObject,
          );
          return {
            schema,
            schemaId,
            credDefId,
            credDef,
            mainPresentationRequest,
          };
        }
      })
      .then(defs => {
        if (defs && presentation) {
          const verified = verifyPresentation(
            presentation,
            defs?.mainPresentationRequest,
            defs?.schema,
            defs?.schemaId,
            defs?.credDef,
            defs?.credDefId,
          );
          if (!verified) {
            setError('Improper proof that the name is verified');
          }
        }
      });
  }, [presentation]);

  if (address && address !== pk?.toBase58()) {
    setError('Address does not match the one in the proof');
  }

  return (
    <>
      {presentation && (
        <Text>
          {t('Sent to') + ` ${firstName} ${lastName} - pseudo: ${pseudo} `}
        </Text>
      )}
      {!error && data && pk && value && (
        <SendLogic
          pk={pk}
          value={value}
          reloadBalances={props.reloadBalances}
          setError={setError}
        />
      )}
      {error && <Text style={mainStyle.errorText}>{error}</Text>}
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
