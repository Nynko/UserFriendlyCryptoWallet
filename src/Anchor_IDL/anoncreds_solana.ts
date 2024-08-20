/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/anoncreds_solana.json`.
 */
export type AnoncredsSolana = {
  "address": "3L5JCJMYAj5UwieSvEvtaRg9vqETjJUZZaN3AKRt9dQU",
  "metadata": {
    "name": "anoncredsSolana",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "amortizationCredentialDefinition",
      "discriminator": [
        91,
        163,
        44,
        20,
        251,
        102,
        70,
        44
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "credDefAcccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  110,
                  99,
                  104,
                  111,
                  114,
                  95,
                  108,
                  97,
                  110,
                  103,
                  32,
                  58,
                  58,
                  32,
                  115,
                  111,
                  108,
                  97,
                  110,
                  97,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  32,
                  58,
                  58,
                  32,
                  104,
                  97,
                  115,
                  104,
                  32,
                  58,
                  58,
                  10,
                  104,
                  97,
                  115,
                  104,
                  40,
                  38,
                  10,
                  91,
                  98,
                  34,
                  99,
                  114,
                  101,
                  100,
                  101,
                  110,
                  116,
                  105,
                  97,
                  108,
                  95,
                  100,
                  101,
                  102,
                  105,
                  110,
                  105,
                  116,
                  105,
                  111,
                  110,
                  34,
                  44,
                  32,
                  95,
                  116,
                  97,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tag",
          "type": "string"
        },
        {
          "name": "schemaId",
          "type": "string"
        },
        {
          "name": "dataToAdd",
          "type": "string"
        }
      ]
    },
    {
      "name": "storeCredentialDefinition",
      "discriminator": [
        87,
        14,
        50,
        180,
        8,
        223,
        235,
        255
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "credDefAcccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  110,
                  99,
                  104,
                  111,
                  114,
                  95,
                  108,
                  97,
                  110,
                  103,
                  32,
                  58,
                  58,
                  32,
                  115,
                  111,
                  108,
                  97,
                  110,
                  97,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  32,
                  58,
                  58,
                  32,
                  104,
                  97,
                  115,
                  104,
                  32,
                  58,
                  58,
                  10,
                  104,
                  97,
                  115,
                  104,
                  40,
                  38,
                  10,
                  91,
                  98,
                  34,
                  99,
                  114,
                  101,
                  100,
                  101,
                  110,
                  116,
                  105,
                  97,
                  108,
                  95,
                  100,
                  101,
                  102,
                  105,
                  110,
                  105,
                  116,
                  105,
                  111,
                  110,
                  34,
                  44,
                  32,
                  99,
                  114,
                  101,
                  100,
                  101,
                  110,
                  116,
                  105,
                  97,
                  108,
                  95,
                  100,
                  101,
                  102,
                  105,
                  110,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "credentialDefinition",
          "type": {
            "defined": {
              "name": "credentialDefinition"
            }
          }
        },
        {
          "name": "space",
          "type": "u64"
        }
      ]
    },
    {
      "name": "storeSchema",
      "discriminator": [
        5,
        75,
        176,
        160,
        104,
        120,
        222,
        130
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "schemaAcccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  99,
                  104,
                  101,
                  109,
                  97
                ]
              },
              {
                "kind": "arg",
                "path": "schema.name"
              },
              {
                "kind": "arg",
                "path": "schema.version"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "schema",
          "type": {
            "defined": {
              "name": "schema"
            }
          }
        },
        {
          "name": "space",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "credentialDefinition",
      "discriminator": [
        86,
        43,
        148,
        149,
        133,
        199,
        215,
        56
      ]
    },
    {
      "name": "schema",
      "discriminator": [
        197,
        41,
        118,
        109,
        215,
        189,
        52,
        105
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "issuerIdNotMatching",
      "msg": "Couldn't match the issuer id to a publickey: either wrong size or invalid"
    },
    {
      "code": 6001,
      "name": "badlyFormattedUri",
      "msg": "The uri seems badly formatted"
    }
  ],
  "types": [
    {
      "name": "credentialDefinition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "issuerId",
            "type": "string"
          },
          {
            "name": "schemaId",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string"
          },
          {
            "name": "tag",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "schema",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "issuerId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          },
          {
            "name": "attrNames",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ]
};
