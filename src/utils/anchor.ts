import * as anchor from '@coral-xyz/anchor';
import {Program} from '@coral-xyz/anchor';
import {AnoncredsSolana} from '../Anchor_IDL/anoncreds_solana';
import {
  CredentialDefinition,
  JsonObject,
} from '@hyperledger/anoncreds-react-native';

export async function fetch_credential_definition(
  accountAddress: anchor.web3.PublicKey,
  anoncredProgram: Program<AnoncredsSolana>,
) {
  const credentialDefinitionJson =
    await anoncredProgram.account.credentialDefinition.fetch(accountAddress);

  const credentialDefinition = {
    ...credentialDefinitionJson,
    value: JSON.parse(credentialDefinitionJson.value),
  };

  return CredentialDefinition.fromJson(credentialDefinition as JsonObject);
}
