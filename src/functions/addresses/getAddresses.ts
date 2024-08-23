import {EURC_MINT} from '../../const';
import {AddressesContextState} from '../../hooks/contexts/useAddresses';
import * as anchor from '@coral-xyz/anchor';
import {accessAddress} from '../wallet/solana_wallet';
import {KeychainElements} from '../../types/keychains';
import {accessValueUnlocked} from '../secrets';

export async function getAddresses(): Promise<Error | AddressesContextState> {
  const mint = new anchor.web3.PublicKey(EURC_MINT);
  const addresses = await Promise.all([
    accessAddress(KeychainElements.SOL_PublicKey),
    accessAddress(KeychainElements.SOL_WrappedAccountAddMint + mint.toString()),
    accessAddress(KeychainElements.SOL_Idendity),
    accessAddress(KeychainElements.SOL_TwoAuth),
    accessAddress(KeychainElements.SOL_TwoAuthEntity),
    accessAddress(KeychainElements.SOL_RecoveryAccount),
  ]);
  const pseudo = await accessValueUnlocked(KeychainElements.SOL_PseudoValue);
  if (pseudo instanceof Error) {
    return pseudo;
  }

  const error = addresses.find(address => address instanceof Error);
  if (error) {
    return error;
  }

  const [pubKey, wrappedToken, idendity, twoAuth, twoAuthEntity, recovery] =
    addresses as anchor.web3.PublicKey[];

  return {
    pubKey,
    wrappedToken,
    idendity,
    twoAuth,
    twoAuthEntity,
    recovery,
    pseudo,
  };
}
