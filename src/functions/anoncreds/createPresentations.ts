import {
  Credential,
  CredentialDefinition,
  CredentialProve,
  LinkSecret,
  Presentation,
  PresentationRequest,
  Schema,
} from '@hyperledger/anoncreds-react-native';
import {ANONCREDS_SCHEMA_NAME} from '../../const';

export function createMainPresentation(
  cred: Credential,
  credDefId: string,
  linkSecret: LinkSecret,
  schema: Schema,
  schemaId: string,
  credDef: CredentialDefinition,
) {
  // "firstName",
  // "lastName",
  // "dateOfBirth",
  // "pseudo",
  // "solanaAddress",
  // "solId"
  const requestJson = {
    name: 'proof_publicKey_link',
    nonce: '0', // Here the verifier is not asking with a specific non, we can have a "replay" attack because we want to replay it actually: we don't have proofs of non revocation to do
    version: '1.0',
    requested_attributes: {
      infos: {
        names: ['firstName', 'lastName', 'pseudo', 'solanaAddress', 'solId'],
        restrictions: [
          {
            schema_name: ANONCREDS_SCHEMA_NAME,
          },
        ],
      },
    },
    // requested_predicates: { // Example of requested predicate
    //   adult: {
    //     name: 'age',
    //     p_type: '>=',
    //     p_value: 18,
    //     restrictions: [
    //       {
    //         schema_name: 'schema-1',
    //       },
    //     ],
    //   },
    // },
  };

  const presentationRequest = PresentationRequest.fromJson(requestJson);

  let credProve: CredentialProve[] = [];
  credProve.push({
    entryIndex: 0,
    referent: 'infos',
    isPredicate: false,
    reveal: true,
  });
  // for (const a in requestJson.requested_predicates) {
  //   credProve.push({
  //     entryIndex: 0,
  //     referent: a,
  //     isPredicate: true,
  //     reveal: false,
  //   });
  // }

  const presentation = Presentation.create({
    presentationRequest,
    credentials: [{credential: cred}],
    credentialsProve: credProve,
    selfAttest: {},
    linkSecret: linkSecret.toString(),
    schemas: {[schemaId]: schema},
    credentialDefinitions: {[credDefId]: credDef},
  });

  return {
    presentation,
    presentationRequest,
    credDef,
    credDefId,
  };
}

export function verifyPresentation(
  presentation: Presentation,
  presentationRequest: PresentationRequest,
  schema: Schema,
  schemaId: string,
  credDef: CredentialDefinition,
  credDefId: string,
) {
  return presentation.verify({
    presentationRequest,
    schemas: {[schemaId]: schema},
    credentialDefinitions: {[credDefId]: credDef},
  });
}
