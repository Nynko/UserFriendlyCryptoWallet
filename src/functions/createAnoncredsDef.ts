import { Schema, CredentialDefinition } from '@hyperledger/anoncreds-react-native'
import { anoncreds } from '@hyperledger/anoncreds-react-native'


export function CreateAnonCredsDef(){

    // const schema = Schema.create({
    //     name: 'test',
    //     version: '1.0',
    //     issuerId: 'mock:uri',
    //     attributeNames: ['name', 'age', 'address']
    //   })

      const schema = Schema.create({
        name: 'schema-1',
        issuerId: 'mock:uri',
        version: '1',
        attributeNames: ['name', 'age', 'address']
      })


    const schemaId = "mock:uri";
    
    // const {credentialDefinition, credentialDefinitionPrivate, keyCorrectnessProof} =  CredentialDefinition.create({schemaId,schema,issuerId: 'mock:uri',tag:'tag',signatureType:"CL",supportRevocation:false})

    const { credentialDefinition, keyCorrectnessProof, credentialDefinitionPrivate } = CredentialDefinition.create({
      schemaId: 'mock:uri',
      issuerId: 'mock:uri',
      schema,
      signatureType: 'CL',
      supportRevocation: false,
      tag: 'TAG'
    })
    
    const credDefId =  "mock:uri";
      
    return {schema, schemaId, credentialDefinition,credDefId, credentialDefinitionPrivate, keyCorrectnessProof}
}