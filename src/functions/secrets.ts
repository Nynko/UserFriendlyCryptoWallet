/* 
This contain the logic for creating a solana wallet,
storing it securely and access it when needed. 
*/
import * as Keychain from 'react-native-keychain';
import {Platform} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {KeychainElements} from '../types/keychains';

export async function store_secret(
  username: string,
  secret: string,
  service: string,
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
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    // accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
    authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
  };

  Keychain.setGenericPassword(username, secret, constraints);

  // Generate a backup with password protection ?
  // accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, --> Iphone
}
