/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/asset_based.json`.
 */
export type AssetBased = {
  "address": "FRHkJLQxLmaTKTbfRdR8LQUA5h95CDqJZRpjTnqQN4Ng",
  "metadata": {
    "name": "assetBased",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addIssuerToId",
      "discriminator": [
        213,
        147,
        148,
        84,
        40,
        47,
        21,
        188
      ],
      "accounts": [
        {
          "name": "issuer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "idendity",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "idValidityDuration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "addIssuersWrapper",
      "discriminator": [
        90,
        150,
        120,
        185,
        80,
        51,
        41,
        200
      ],
      "accounts": [
        {
          "name": "wrapperAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "approver",
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "issuer",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "addPseudo",
      "discriminator": [
        9,
        252,
        66,
        94,
        22,
        207,
        241,
        108
      ],
      "accounts": [
        {
          "name": "idendity",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "pseudoAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  115,
                  101,
                  117,
                  100,
                  111
                ]
              },
              {
                "kind": "arg",
                "path": "pseudo"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pseudo",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeId",
      "discriminator": [
        63,
        161,
        143,
        94,
        240,
        8,
        194,
        92
      ],
      "accounts": [
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "issuer",
          "signer": true
        },
        {
          "name": "idendity",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "idValidityDuration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeRecovery",
      "discriminator": [
        219,
        233,
        33,
        218,
        155,
        25,
        55,
        18
      ],
      "accounts": [
        {
          "name": "recoveryAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  99,
                  111,
                  118,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "recoveryDelegates",
          "type": {
            "vec": {
              "defined": {
                "name": "recoveryAuthority"
              }
            }
          }
        }
      ]
    },
    {
      "name": "initializeTwoAuth",
      "discriminator": [
        240,
        201,
        133,
        234,
        112,
        48,
        218,
        210
      ],
      "accounts": [
        {
          "name": "idendity",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "twoAuth",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  119,
                  111,
                  95,
                  97,
                  117,
                  116,
                  104
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "twoAuthEntity",
          "signer": true,
          "optional": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "twoAuth",
          "type": {
            "option": {
              "defined": {
                "name": "twoAuthArgs"
              }
            }
          }
        }
      ]
    },
    {
      "name": "initializeWrapper",
      "discriminator": [
        143,
        211,
        228,
        247,
        131,
        67,
        40,
        30
      ],
      "accounts": [
        {
          "name": "wrapperAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "approver",
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "listIssuer",
          "type": {
            "vec": "pubkey"
          }
        },
        {
          "name": "exitRegulators",
          "type": {
            "vec": "pubkey"
          }
        }
      ]
    },
    {
      "name": "recoverAccount",
      "discriminator": [
        240,
        223,
        246,
        118,
        26,
        121,
        34,
        128
      ],
      "accounts": [
        {
          "name": "recoveryAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  99,
                  111,
                  118,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "userWrappedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner"
        },
        {
          "name": "recoverAuthorityWrappedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "account",
                "path": "mainRecoveryAuthority"
              }
            ]
          }
        },
        {
          "name": "mainRecoveryAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "twoAuth",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  119,
                  111,
                  95,
                  97,
                  117,
                  116,
                  104
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "idendity",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "removeIssuerWrapper",
      "discriminator": [
        29,
        234,
        10,
        98,
        23,
        35,
        22,
        183
      ],
      "accounts": [
        {
          "name": "wrapperAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "approver",
          "signer": true
        },
        {
          "name": "issuer"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "transfer",
      "discriminator": [
        163,
        52,
        200,
        231,
        140,
        3,
        69,
        186
      ],
      "accounts": [
        {
          "name": "sourceWrappedAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "account",
                "path": "sourceOwner"
              }
            ]
          }
        },
        {
          "name": "sourceOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "idenditySender",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "sourceOwner"
              }
            ]
          }
        },
        {
          "name": "twoAuth",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  119,
                  111,
                  95,
                  97,
                  117,
                  116,
                  104
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "sourceOwner"
              }
            ]
          }
        },
        {
          "name": "destinationWrappedAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "account",
                "path": "destinationOwner"
              }
            ]
          }
        },
        {
          "name": "destinationOwner"
        },
        {
          "name": "idendityReceiver",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "destinationOwner"
              }
            ]
          }
        },
        {
          "name": "twoAuthSigner",
          "signer": true,
          "optional": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unwrapTokens",
      "discriminator": [
        17,
        121,
        3,
        250,
        67,
        105,
        232,
        113
      ],
      "accounts": [
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "exitRegulator",
          "signer": true
        },
        {
          "name": "userWrappedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "toTokenAccount",
          "writable": true
        },
        {
          "name": "ownerTokenAccount"
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "decimals",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePseudo",
      "discriminator": [
        123,
        25,
        227,
        244,
        182,
        144,
        60,
        124
      ],
      "accounts": [
        {
          "name": "idendity",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "newPseudoAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  115,
                  101,
                  117,
                  100,
                  111
                ]
              },
              {
                "kind": "arg",
                "path": "pseudo"
              }
            ]
          }
        },
        {
          "name": "oldPseudoAccount",
          "writable": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pseudo",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateTwoAuth",
      "discriminator": [
        222,
        98,
        57,
        40,
        232,
        148,
        90,
        198
      ],
      "accounts": [
        {
          "name": "idendity",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "twoAuth",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  119,
                  111,
                  95,
                  97,
                  117,
                  116,
                  104
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "twoAuthEntity",
          "signer": true,
          "optional": true
        },
        {
          "name": "oldTwoAuthEntity",
          "signer": true,
          "optional": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "twoAuth",
          "type": {
            "option": {
              "defined": {
                "name": "twoAuthArgs"
              }
            }
          }
        }
      ]
    },
    {
      "name": "wrapTokens",
      "discriminator": [
        244,
        137,
        57,
        251,
        232,
        224,
        54,
        14
      ],
      "accounts": [
        {
          "name": "wrapperAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "approver"
              }
            ]
          }
        },
        {
          "name": "approver"
        },
        {
          "name": "toWrappedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "wrapperAccount"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "account",
                "path": "ownerToAccount"
              }
            ]
          }
        },
        {
          "name": "fromTokenAccount",
          "writable": true
        },
        {
          "name": "ownerFromTokenAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "ownerToAccount"
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "decimals",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "idAccount",
      "discriminator": [
        97,
        148,
        16,
        183,
        235,
        126,
        146,
        150
      ]
    },
    {
      "name": "pseudoAccount",
      "discriminator": [
        115,
        176,
        208,
        64,
        36,
        83,
        249,
        61
      ]
    },
    {
      "name": "recoveryAuthorities",
      "discriminator": [
        123,
        17,
        210,
        150,
        42,
        52,
        233,
        39
      ]
    },
    {
      "name": "twoAuth",
      "discriminator": [
        130,
        227,
        165,
        108,
        170,
        222,
        193,
        225
      ]
    },
    {
      "name": "wrapperAccount",
      "discriminator": [
        66,
        159,
        143,
        36,
        181,
        246,
        145,
        205
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "idendityAlreadyExists",
      "msg": "Idendity already exists"
    },
    {
      "code": 6001,
      "name": "idendityNotActive",
      "msg": "Idendity is not active"
    },
    {
      "code": 6002,
      "name": "idendityExpired",
      "msg": "Idendity expired"
    },
    {
      "code": 6003,
      "name": "idendityRecovered",
      "msg": "Idendity recovered"
    },
    {
      "code": 6004,
      "name": "idendityAlreadyRecovered",
      "msg": "Idendity already recovered"
    },
    {
      "code": 6005,
      "name": "issuerNotApproved",
      "msg": "Issuer is not approved"
    },
    {
      "code": 6006,
      "name": "invalidIdendity",
      "msg": "No approved issuer found or inactive/expired issuer"
    },
    {
      "code": 6007,
      "name": "pseudoAlreadyExist",
      "msg": "A pseudo already exist, please use the update method"
    },
    {
      "code": 6008,
      "name": "pseudoDontExist",
      "msg": "The old pseudo doesn't exist, please use the add method"
    }
  ],
  "types": [
    {
      "name": "circularTimeWindow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startIndex",
            "type": "u8"
          },
          {
            "name": "window",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "duration",
            "type": {
              "defined": {
                "name": "duration"
              }
            }
          },
          {
            "name": "lastValueTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "duration",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "seconds",
            "fields": [
              "u8"
            ]
          },
          {
            "name": "minutes",
            "fields": [
              "u8"
            ]
          },
          {
            "name": "hours",
            "fields": [
              "u8"
            ]
          },
          {
            "name": "days",
            "fields": [
              "u8"
            ]
          },
          {
            "name": "weeks",
            "fields": [
              "u8"
            ]
          }
        ]
      }
    },
    {
      "name": "idAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "issuers",
            "type": {
              "vec": {
                "defined": {
                  "name": "issuer"
                }
              }
            }
          },
          {
            "name": "recoveredAddress",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "associatedPseudo",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "issuer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "pubkey"
          },
          {
            "name": "lastModified",
            "type": "i64"
          },
          {
            "name": "expiresAt",
            "type": "i64"
          },
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "pseudoAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "recoveryAuthorities",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authorities",
            "type": {
              "vec": {
                "defined": {
                  "name": "recoveryAuthority"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "recoveryAuthority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "minSignatures",
            "type": "u8"
          },
          {
            "name": "minDuration",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "twoAuth",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "twoAuth",
            "type": {
              "option": {
                "defined": {
                  "name": "twoAuthParameters"
                }
              }
            }
          },
          {
            "name": "lastTx",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "twoAuthArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "functions",
            "type": {
              "vec": {
                "defined": {
                  "name": "twoAuthFunction"
                }
              }
            }
          },
          {
            "name": "allowedIssuers",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "twoAuthFunction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "always"
          },
          {
            "name": "onMax",
            "fields": [
              {
                "name": "max",
                "type": "u64"
              }
            ]
          },
          {
            "name": "counterResetOnMax",
            "fields": [
              {
                "name": "max",
                "type": "u64"
              },
              {
                "name": "counter",
                "type": "u64"
              }
            ]
          },
          {
            "name": "counterResetOnTime",
            "fields": [
              {
                "name": "max",
                "type": "u64"
              },
              {
                "name": "duration",
                "type": {
                  "defined": {
                    "name": "duration"
                  }
                }
              },
              {
                "name": "counter",
                "type": "u64"
              },
              {
                "name": "lastResetTime",
                "type": "i64"
              }
            ]
          },
          {
            "name": "counterWithTimeWindow",
            "fields": [
              {
                "name": "max",
                "type": "u64"
              },
              {
                "name": "window",
                "type": {
                  "defined": {
                    "name": "circularTimeWindow"
                  }
                }
              }
            ]
          },
          {
            "name": "deactivateForUserSpecificWhiteList",
            "fields": [
              {
                "name": "whiteList",
                "type": {
                  "vec": "pubkey"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "twoAuthParameters",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "functions",
            "type": {
              "vec": {
                "defined": {
                  "name": "twoAuthFunction"
                }
              }
            }
          },
          {
            "name": "twoAuthEntity",
            "type": "pubkey"
          },
          {
            "name": "allowedIssuers",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "wrapperAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "approver",
            "type": "pubkey"
          },
          {
            "name": "idIssuers",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "exitRegulators",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
