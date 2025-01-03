/* 
This contain the logic for creating a solana wallet,
storing it securely and access it when needed. 
*/
import * as Keychain from 'react-native-keychain';
import * as anchor from '@coral-xyz/anchor';
import {store_secret} from '../secrets';
import {KeychainElements} from '../../types/keychains';
import {SolanaWalletErrors} from '../../Errors/Solana/SolanaWalletsErrors';
import {TypedError} from '../../Errors/TypedError';
import {Platform} from 'react-native';

export async function createSolanaWallet(
  programId: anchor.web3.PublicKey,
  wrapperAccount: anchor.web3.PublicKey,
  mint: anchor.web3.PublicKey,
): Promise<[anchor.web3.PublicKey, anchor.web3.PublicKey]> {
  let [key, wrapped_account] = generateKeypairMint(
    programId,
    wrapperAccount,
    mint,
  );
  if (!key) {
    throw new Error('Error while generating key');
  }
  let username = JSON.stringify(key.publicKey);
  let secretKey = JSON.stringify(Array.from(key.secretKey));

  await store_secret(username, secretKey, KeychainElements.SOL_PrivateKey);

  console.log('Created a new solana wallet: ', key.publicKey.toBase58());

  // Generate a backup with password protection ?
  // accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, --> Iphone

  return [key.publicKey, wrapped_account];
}

export async function accessSolanaWallet(): Promise<anchor.web3.Keypair> {
  if (Platform.OS === 'android') {
    let android_security_level = await Keychain.getSecurityLevel();
    console.log(android_security_level);
  }
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword({
      service: KeychainElements.SOL_PrivateKey,
    });
    if (credentials) {
      const secret = JSON.parse(credentials.password) as number[];
      const secretKey = Uint8Array.from(secret);
      return anchor.web3.Keypair.fromSecretKey(secretKey);
    } else {
      const errorMess = 'No credentials stored';
      console.log(errorMess);
      throw Error(errorMess);
    }
  } catch (error) {
    const errorMess = "Keychain couldn't be accessed! :" + error;
    console.log(errorMess);
    throw Error(errorMess);
  }
}

/**
 * This function generate addresses that has a maximum bump of 255 for the PDAs necessary when transfering a specific mint (often EURC).
 * This is to ensure minimum Comput-Unit use when transfering and prevent inequality in this matter.
 * @param programId The program ID (should be always the same, taken from the IDL with check from a constant)
 * @param wrapperAccount The wrapper account corresponding to our provider (ourselves)
 * @param mint The mint account
 * @returns A web3.Keypair with 255 bump for generating the pdas related to transfers
 */
function generateKeypairMint(
  programId: anchor.web3.PublicKey,
  wrapper_pda: anchor.web3.PublicKey,
  mint: anchor.web3.PublicKey,
): [anchor.web3.Keypair, anchor.web3.PublicKey] {
  let keypair: anchor.web3.Keypair | null = null;
  let wrapped_account: anchor.web3.PublicKey | null = null;
  let errorOccurred = true;
  while (errorOccurred) {
    try {
      keypair = anchor.web3.Keypair.generate();
      wrapped_account = anchor.web3.PublicKey.createProgramAddressSync(
        [
          Buffer.from('wrapped_token'),
          wrapper_pda.toBuffer(),
          mint.toBuffer(),
          keypair.publicKey.toBuffer(),
          Buffer.from([255]), // Bump of 255
        ],
        programId,
      );
      errorOccurred = false;
    } catch (error) {
      continue;
    }
  }

  if (!keypair || !wrapped_account) {
    throw new Error('Error when generating a new solana keypair');
  }

  return [keypair, wrapped_account];
}

export async function saveAddress(
  address: anchor.web3.PublicKey,
  service: string,
  username?: string,
) {
  let biometric = await Keychain.getSupportedBiometryType();
  // if (Platform.OS === 'android') {
  //   let android_security_level = await Keychain.getSecurityLevel();
  // }
  let constraints: Keychain.Options = {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    service: service,
  };
  if (biometric) {
  }
  constraints = {
    ...constraints,
  };

  let secretKey = JSON.stringify(address);

  if (!username) {
    username = service;
  }
  Keychain.setGenericPassword(username, secretKey, constraints);

  // Generate a backup with password protection ?
  // accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, --> Iphone
}

export async function accessAddress(
  service: string,
): Promise<anchor.web3.PublicKey | Error> {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword({
      service: service,
    });
    if (credentials) {
      const address = JSON.parse(credentials.password);
      return new anchor.web3.PublicKey(address);
    } else {
      return new TypedError(SolanaWalletErrors.NoCredentialStored);
    }
  } catch (error) {
    return error as Error;
  }
}

export async function deleteKeychain(service: string): Promise<boolean> {
  Keychain.resetGenericPassword({
    service,
  });
  return true;
}
