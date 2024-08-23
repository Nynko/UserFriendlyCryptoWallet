import {Button} from 'react-native';
import {CreateAnonCredsDef} from '../functions/TODELETE/createAnoncredsDef';
import {
  createCredential,
  createCredRequest,
} from '../functions/TODELETE/createCredentials';
import {
  createPresentation,
  verifyPresentation,
} from '../functions/anoncreds/createPresentations';
import {
  anoncreds,
  Credential,
  CredentialDefinition,
  CredentialOffer,
  CredentialRequest,
  CredentialRevocationConfig,
  LinkSecret,
  Presentation,
  PresentationRequest,
  RevocationRegistryDefinition,
  RevocationStatusList,
  Schema,
} from '@hyperledger/anoncreds-react-native';

export function TestCreateAnonCreds() {
  const handleSubmit = () => {
    //   const { revocationRegistryDefinition, revocationRegistryDefinitionPrivate } = RevocationRegistryDefinition.create({
    //     credentialDefinitionId: 'mock:uri',
    //     credentialDefinition,
    //     issuerId: 'mock:uri',
    //     tag: 'some_tag',
    //     revocationRegistryType: 'CL_ACCUM',
    //     maximumCredentialNumber: 10
    //   })

    //   const tailsPath = revocationRegistryDefinition.getTailsLocation()

    //   const timeCreateRevStatusList = 12
    //   const revocationStatusList = RevocationStatusList.create({
    //     credentialDefinition,
    //     revocationRegistryDefinitionId: 'mock:uri',
    //     revocationRegistryDefinition,
    //     revocationRegistryDefinitionPrivate,
    //     issuerId: 'mock:uri',
    //     issuanceByDefault: true,
    //     timestamp: timeCreateRevStatusList
    //   })

    //   const credentialOffer = CredentialOffer.create({
    //     schemaId: 'mock:uri',
    //     credentialDefinitionId: 'mock:uri',
    //     keyCorrectnessProof
    //   })

    //   const linkSecret = LinkSecret.create()
    //   const linkSecretId = 'link secret id'

    //   const { credentialRequestMetadata, credentialRequest } = CredentialRequest.create({
    //     entropy: 'entropy',
    //     credentialDefinition,
    //     linkSecret,
    //     linkSecretId,
    //     credentialOffer
    //   })

    //   const credential = Credential.create({
    //     credentialDefinition,
    //     credentialDefinitionPrivate,
    //     credentialOffer,
    //     credentialRequest,
    //     attributeRawValues: { name: 'Alex', height: '175', age: '28', sex: 'male' },
    //   })

    //   console.log(credential.toJson());

    //   const credentialReceived = credential.process({
    //     credentialDefinition,
    //     credentialRequestMetadata,
    //     linkSecret,
    //   })

    // ZEZEZEZEZEZEZEZEZEZEZ
    // const nonce = anoncreds.generateNonce()

    // const presentationRequest = PresentationRequest.fromJson({
    // nonce,
    // name: 'pres_req_1',
    // version: '0.1',
    // requested_attributes: {
    //     attr1_referent: {
    //     name: 'name',
    //     issuer: 'mock:uri'
    //     },
    //     attr2_referent: {
    //     name: 'sex'
    //     },
    //     attr3_referent: {
    //     name: 'phone'
    //     },
    //     attr4_referent: {
    //     names: ['name', 'height']
    //     }
    // },
    // requested_predicates: {
    //     predicate1_referent: { name: 'age', p_type: '>=', p_value: 18 }
    // },
    // non_revoked: { from: 13, to: 200 }
    // })

    // const schema = Schema.create({
    // name: 'schema-1',
    // issuerId: 'mock:uri',
    // version: '1',
    // attributeNames: ['name', 'age', 'sex', 'height']
    // })

    // const { credentialDefinition, keyCorrectnessProof, credentialDefinitionPrivate } = CredentialDefinition.create({
    // schemaId: 'mock:uri',
    // issuerId: 'mock:uri',
    // schema,
    // signatureType: 'CL',
    // supportRevocation: false,
    // tag: 'TAG'
    // })

    // const credentialOffer = CredentialOffer.create({
    // schemaId: 'mock:uri',
    // credentialDefinitionId: 'mock:uri',
    // keyCorrectnessProof
    // })

    // const linkSecret = LinkSecret.create()
    // const linkSecretId = 'link secret id'

    // const { credentialRequestMetadata, credentialRequest } = CredentialRequest.create({
    // entropy: 'entropy',
    // credentialDefinition,
    // linkSecret,
    // linkSecretId,
    // credentialOffer
    // })

    // const credential = Credential.create({
    // credentialDefinition,
    // credentialDefinitionPrivate,
    // credentialOffer,
    // credentialRequest,
    // attributeRawValues: { name: 'Alex', height: '175', age: '28', sex: 'male' }
    // })

    // const credentialReceived = credential.process({
    // credentialDefinition,
    // credentialRequestMetadata,
    // linkSecret,
    // })

    // const presentation = Presentation.create({
    // presentationRequest,
    // credentials: [
    //     {
    //     credential: credentialReceived
    //     }
    // ],
    // credentialDefinitions: { 'mock:uri': credentialDefinition },
    // credentialsProve: [
    //     {
    //     entryIndex: 0,
    //     isPredicate: false,
    //     referent: 'attr1_referent',
    //     reveal: true
    //     },
    //     {
    //     entryIndex: 0,
    //     isPredicate: false,
    //     referent: 'attr2_referent',
    //     reveal: false
    //     },
    //     {
    //     entryIndex: 0,
    //     isPredicate: false,
    //     referent: 'attr4_referent',
    //     reveal: true
    //     },
    //     {
    //     entryIndex: 0,
    //     isPredicate: true,
    //     referent: 'predicate1_referent',
    //     reveal: true
    //     }
    // ],
    // linkSecret,
    // schemas: { 'mock:uri': schema },
    // selfAttest: { attr3_referent: '8-800-300' }
    // })

    // const verify = presentation.verify({
    // presentationRequest,
    // schemas: { 'mock:uri': schema },
    // credentialDefinitions: { 'mock:uri': credentialDefinition },
    // })

    // console.log(verify);

    const {
      schema,
      schemaId,
      credentialDefinition,
      credDefId,
      credentialDefinitionPrivate,
      keyCorrectnessProof,
    } = CreateAnonCredsDef();
    console.log(schema);

    const {
      linkSecret,
      credentialOffer,
      credentialRequest,
      credentialRequestMetadata,
    } = createCredRequest(
      schemaId,
      credentialDefinition,
      credDefId,
      keyCorrectnessProof,
    );
    console.log('credRequest', credentialRequest.toJson());
    const credential = createCredential(
      linkSecret,
      credentialRequestMetadata,
      credentialDefinition,
      credentialDefinitionPrivate,
      credentialOffer,
      credentialRequest,
    );

    console.log('credential', credential.toJson());

    const {presentation, presentationRequest} = createPresentation(
      credential,
      credDefId,
      linkSecret,
      schema,
      schemaId,
      credentialDefinition,
    );
    console.log('presentation', presentation.toJson());

    const good = verifyPresentation(
      presentation,
      presentationRequest,
      schema,
      schemaId,
      credentialDefinition,
      credDefId,
    );
    console.log('verify:', good);
  };

  return (
    <>
      <Button title="Create AnonCreds" onPress={handleSubmit}></Button>
    </>
  );
}
