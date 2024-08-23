import * as Keychain from 'react-native-keychain';
import {KeychainElements} from '../../types/keychains';
import {Credential, JsonObject} from '@hyperledger/anoncreds-react-native';

export async function accessCredential(): Promise<Credential> {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword({
      service: KeychainElements.AnoncredsCredential,
    });
    if (credentials) {
      return Credential.fromJson(
        JSON.parse(credentials.password) as JsonObject,
      );
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
