/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/handmade_naive.json`.
 */
export type HandmadeNaive = {
  "address": "Dq1SdmsJ5GpeGazTRbhFVoQkowZDY77CDdVhcoAw5Zu",
  "metadata": {
    "name": "handmadeNaive",
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
      "name": "initializeMint",
      "discriminator": [
        209,
        42,
        195,
        4,
        129,
        85,
        209,
        44
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
          "name": "wrapperAssociatedTokenAccount",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
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
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
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
      "name": "initializeWrapAccount",
      "discriminator": [
        215,
        136,
        189,
        15,
        148,
        26,
        38,
        90
      ],
      "accounts": [
        {
          "name": "wrappedTokenAccount",
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
          "name": "payer",
          "writable": true,
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
      "args": []
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
        }
      ]
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
          "writable": true
        },
        {
          "name": "sourceOwner",
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
          "writable": true
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
          "name": "wrapperAccount",
          "relations": [
            "sourceWrappedAccount"
          ]
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
          },
          "relations": [
            "userWrappedTokenAccount"
          ]
        },
        {
          "name": "approver"
        },
        {
          "name": "wrapperTokenAccount",
          "writable": true
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
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true
        },
        {
          "name": "mint",
          "relations": [
            "userWrappedTokenAccount"
          ]
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
      "name": "wrappedTokenAccount",
      "discriminator": [
        110,
        125,
        117,
        175,
        200,
        107,
        71,
        221
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
      "name": "recoveryTimeNotPassed",
      "msg": "Recovery time not passed"
    },
    {
      "code": 6001,
      "name": "notEnoughSignatures",
      "msg": "Not enough signatures"
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
      "name": "wrappedTokenAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "lastTx",
            "type": "i64"
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
            "name": "listIssuer",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    }
  ]
};
