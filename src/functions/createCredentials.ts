import { Schema, CredentialDefinition, CredentialRequest, CredentialOffer, KeyCorrectnessProof, LinkSecret, Credential, CredentialDefinitionPrivate, CredentialRequestMetadata } from '@hyperledger/anoncreds-react-native'


export function createCredRequest(schemaId: string, credentialDefinition: CredentialDefinition, credDefId : string, keyCorrectnessProof: KeyCorrectnessProof){

    const credentialOffer = CredentialOffer.create({
        schemaId: 'mock:uri',
        credentialDefinitionId: 'mock:uri',
        keyCorrectnessProof
      })


    const linkSecret = LinkSecret.create() // UUID
    const linkSecretId = 'link secret id'

    const { credentialRequestMetadata, credentialRequest } = CredentialRequest.create({
      entropy: 'entropy',
      credentialDefinition,
      linkSecret,
      linkSecretId,
      credentialOffer
    })

    
    return {linkSecret,credentialRequest,credentialRequestMetadata, credentialOffer}

}


// export function createCredOffer(schemaId: string, credentialDefinitionId: string, keyCorrectnessProof: KeyCorrectnessProof){
//     return CredentialOffer.create({
//         schemaId,
//         credentialDefinitionId,
//         keyCorrectnessProof
//     })
// }



export function createCredential(linkSecret: string, credentialRequestMetadata: CredentialRequestMetadata, credentialDefinition: CredentialDefinition, credentialDefinitionPrivate: CredentialDefinitionPrivate, credentialOffer: CredentialOffer, credentialRequest : CredentialRequest){

    const credential = Credential.create({
        credentialDefinition,
        credentialDefinitionPrivate,
        credentialOffer,
        credentialRequest,
        attributeRawValues: { name: 'Nicolas', age: '26', address: 'whatever' },
      })

    const credentialReceived = credential.process({
      credentialDefinition,
      credentialRequestMetadata,
      linkSecret,
      })

    return credentialReceived;

}

// export type CreateCredentialOptions = {
//     credentialDefinition: CredentialDefinition | JsonObject;
//     credentialDefinitionPrivate: CredentialDefinitionPrivate | JsonObject;
//     credentialOffer: CredentialOffer | JsonObject;
//     credentialRequest: CredentialRequest | JsonObject;
//     attributeRawValues: Record<string, string>;
//     attributeEncodedValues?: Record<string, string>;
//     revocationRegistryId?: string;
//     revocationConfiguration?: CredentialRevocationConfig;
//     revocationStatusList?: RevocationStatusList | JsonObject;
// };