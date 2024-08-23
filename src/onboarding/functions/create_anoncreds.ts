import {BACKEND_ID_URL} from '@env';
import {
  Credential,
  CredentialDefinition,
  CredentialOffer,
  CredentialRequest,
  CredentialRequestMetadata,
  JsonObject,
  LinkSecret,
  PresentationRequest,
  Schema,
} from '@hyperledger/anoncreds-react-native';
import {store_secret, storeStringValueUnlocked} from '../../functions/secrets';
import {KeychainElements} from '../../types/keychains';
import {get_solana_address} from '../../utils/anoncredsUris';
import {fetch_credential_definition, fetch_schema} from '../../utils/anchor';
import {Program} from '@coral-xyz/anchor';
import {AnoncredsSolana} from '../../Anchor_IDL/anoncreds_solana';
import {createMainPresentation} from '../../functions/anoncreds/createPresentations';

interface GetCredentialResponse {
  credential_offer: string;
  session_id: number;
}

async function get_credential_offer(): Promise<GetCredentialResponse> {
  try {
    const backend_url = BACKEND_ID_URL;
    console.log();

    const response = await fetch(`${backend_url}/get-credential-offer`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText} : ${response.text}`);
    }

    return await response.json();
  } catch (error) {
    throw error as Error;
  }
}

async function get_credential(
  credentialOffer: CredentialOffer,
  session_id: number,
  credentialValues: Record<string, string>,
  anoncredProgram: Program<AnoncredsSolana>,
): Promise<{
  credentialRequestMetadata: CredentialRequestMetadata;
  credential: Credential;
  linkSecret: LinkSecret;
  credentialDefinition: CredentialDefinition;
  credDefId: string;
}> {
  let credOffer = credentialOffer.toJson();
  let credDefId = credOffer.cred_def_id as string;
  let credDefAddress = get_solana_address(credDefId);

  let credentialDefinition = await fetch_credential_definition(
    credDefAddress,
    anoncredProgram,
  );

  const linkSecret = LinkSecret.create();
  const linkSecretId = 'anoncreds_link_secret';

  store_secret(linkSecretId, linkSecret, KeychainElements.LinkSecret);

  const {Entropy} = require('entropy-string');
  const entropy: string = new Entropy().string();

  const {credentialRequest, credentialRequestMetadata} =
    CredentialRequest.create({
      entropy,
      credentialDefinition,
      linkSecret,
      linkSecretId,
      credentialOffer,
    });

  let credential;

  try {
    const backend_url = BACKEND_ID_URL;
    const response = await fetch(`${backend_url}/create-credential`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential_request: credentialRequest.toJson(),
        session_id,
        credential_values: credentialValues,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText} : ${response.text}`);
    }

    credential = await response.json();
  } catch (error) {
    throw error as Error;
  }

  return {
    credentialRequestMetadata,
    credential: Credential.fromJson(credential),
    linkSecret,
    credentialDefinition,
    credDefId,
  };
}

async function confirm_credential(session_id: number) {
  try {
    const backend_url = BACKEND_ID_URL;
    const response = await fetch(`${backend_url}/confirm-credential`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText} : ${response.text}`);
    }

    return;
  } catch (error) {
    throw error as Error;
  }
}

export async function create_anoncreds(
  credentialValues: Record<string, string>,
  anoncredsProgram: Program<AnoncredsSolana>,
) {
  console.log('Creating anoncreds');

  const {session_id, credential_offer} = await get_credential_offer();
  const credentialOffer = CredentialOffer.fromJson(
    credential_offer as unknown as JsonObject,
  );

  const {
    credential,
    credentialRequestMetadata,
    linkSecret,
    credentialDefinition,
    credDefId,
  } = await get_credential(
    credentialOffer,
    session_id,
    credentialValues,
    anoncredsProgram,
  );

  credential.process({
    credentialRequestMetadata,
    linkSecret: linkSecret as string,
    credentialDefinition,
  });

  let credential_json = JSON.stringify(credential.toJson());

  await store_secret(
    'anoncred_credential',
    credential_json,
    KeychainElements.AnoncredsCredential,
  );

  confirm_credential(session_id);

  let schemaId = credentialOffer.toJson().schema_id as string;
  let schema_address = get_solana_address(schemaId);

  const schema = await fetch_schema(schema_address, anoncredsProgram);

  const {presentation, presentationRequest, credDef} = createMainPresentation(
    credential,
    credDefId,
    linkSecret,
    schema,
    schemaId,
    credentialDefinition,
  );

  const presentation_json = JSON.stringify(presentation.toJson());

  await storeStringValueUnlocked(
    presentation_json,
    KeychainElements.AnoncredsMainPresentation,
  );

  const anoncredsDefinitions = {
    schema: JSON.stringify(schema.toJson()),
    schemaId,
    credDef: JSON.stringify(credDef.toJson()),
    credDefId,
    mainPresentationRequest: JSON.stringify(presentationRequest.toJson()),
  };

  await storeStringValueUnlocked(
    JSON.stringify(anoncredsDefinitions),
    KeychainElements.AnoncredsDefinitions,
  );
  console.log('Anoncreds created');
}

export interface AnoncredsDefinitions {
  schema: Schema;
  schemaId: string;
  credDef: CredentialDefinition;
  credDefId: string;
  mainPresentationRequest: PresentationRequest;
}
