/* 
This contain the logic for creating a solana wallet,
storing it securely and access it when needed. 
*/
import * as Keychain from 'react-native-keychain';
import {Platform} from 'react-native';
import * as anchor from '@coral-xyz/anchor';

export async function createSolanaWallet(
  programId: anchor.web3.PublicKey,
  wrapperAccount: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey> {
  let biometric = await Keychain.getSupportedBiometryType();
  if (Platform.OS === 'android') {
    let android_security_level = await Keychain.getSecurityLevel();
  }
  let constraints: Keychain.Options = {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    service: 'PrivateKey',
  };
  if (biometric) {
  }
  constraints = {
    ...constraints,
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    // accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
    authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
  };

  let key = generateKeypair(programId, wrapperAccount);
  if (!key) {
    throw new Error('Error while generating key');
  }
  let username = JSON.stringify(key.publicKey);
  let secretKey = JSON.stringify(Array.from(key.secretKey));

  Keychain.setGenericPassword(username, secretKey, constraints);

  // Generate a backup with password protection ?
  // accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, --> Iphone

  return key.publicKey;
}

export async function accessSolanaWallet(): Promise<anchor.web3.Keypair> {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword({
      service: 'PrivateKey',
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
 * This function generate addresses that has a maximum bump of 255 for the PDAs necessary when transfering (Idendity and 2auth).
 * This is to ensure minimum Comput-Unit use when transfering and prevent inequality in this matter.
 * @param programId The program ID (should be always the same, taken from the IDL with check from a constant)
 * @param wrapperAccount The wrapper account corresponding to our provider (ourselves)
 * @returns A web3.Keypair with 255 bump for generating the pdas related to transfers
 */
function generateKeypair(
  programId: anchor.web3.PublicKey,
  wrapperAccount: anchor.web3.PublicKey,
) {
  let keypair;
  let errorOccurred = true;
  const bump = 255;
  while (errorOccurred) {
    try {
      keypair = anchor.web3.Keypair.generate();
      anchor.web3.PublicKey.createProgramAddressSync(
        [
          Buffer.from('identity'),
          keypair.publicKey.toBuffer(),
          Buffer.from([bump]),
        ],
        programId,
      );
      anchor.web3.PublicKey.createProgramAddressSync(
        [
          Buffer.from('two_auth'),
          wrapperAccount.toBuffer(),
          keypair.publicKey.toBuffer(),
          Buffer.from([bump]),
        ],
        programId,
      );
      errorOccurred = false;
    } catch (error) {
      continue;
    }
  }

  return keypair;
}

export async function saveAddress(
  address: anchor.web3.PublicKey,
  service: string,
  username: string,
) {
  let biometric = await Keychain.getSupportedBiometryType();
  if (Platform.OS === 'android') {
    let android_security_level = await Keychain.getSecurityLevel();
  }
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

  Keychain.setGenericPassword(username, secretKey, constraints);

  // Generate a backup with password protection ?
  // accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, --> Iphone
}

export async function accessAddress(
  service: string,
): Promise<anchor.web3.PublicKey> {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword({
      service: service,
    });
    if (credentials) {
      const address = JSON.parse(credentials.password);
      return new anchor.web3.PublicKey(address);
    } else {
      const errorMess = 'No credentials stored';
      throw Error(errorMess);
    }
  } catch (error) {
    throw error;
  }
}
