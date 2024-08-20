import { Anoncreds, Credential, CredentialDefinition, CredentialProve, LinkSecret, Presentation, PresentationRequest, registerAnoncreds, Schema } from '@hyperledger/anoncreds-react-native'


export function createPresentation(cred: Credential,credDefId: string, linkSecret: LinkSecret, schema: Schema,schemaId: string, credDef: CredentialDefinition){

    const requestJson = {
        name: "proof-request",
        nonce: "0",
        version: "1.0",
        requested_attributes: {
          infos: {
            names:[
                "name",
                "address"
            ],
            restrictions: [
              {
                schema_name: "schema-1"
              }
            ]
          }
        },
        requested_predicates: {
          adult: {
            name: "age",
            p_type: ">=",
            p_value: 18,
            restrictions: [
              {
                schema_name: "schema-1"
              }
            ]
          }
        }
      }

    const presentationRequest= PresentationRequest.fromJson(requestJson);
    

    let credProve : CredentialProve[] = [];
    credProve.push({entryIndex: 0,referent: "infos", isPredicate: false,reveal:true})
    for (const a in requestJson.requested_predicates){
        credProve.push({entryIndex: 0,referent: a, isPredicate: true,reveal:false})
    }

    console.log(credProve);
    
    

    const presentation = Presentation.create({
        presentationRequest,
        credentials: [{credential:cred}],
        credentialsProve: credProve,
        selfAttest: {},
        linkSecret: linkSecret.toString(),
        schemas: {[schemaId]: schema},
        credentialDefinitions: {[credDefId]: credDef}
    })


    return {presentation, presentationRequest};
}

export function verifyPresentation(presentation: Presentation,presentationRequest : PresentationRequest, schema: Schema, schemaId: string, credDef: CredentialDefinition , credDefId: string){
  return presentation.verify({
    presentationRequest,
    schemas: {[schemaId] : schema},
    credentialDefinitions: {[credDefId]: credDef}
  })

}
