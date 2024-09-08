import {web3 as web3} from '@coral-xyz/anchor';

export const WRAPPER_PDA = '5JEpPmxaVZRbjNJBCkYTe8WSwEbkNWMb5RyTT5PVqy3D';
export const ID_ISSUER = '4BmrURX2ahrARafvkz3uNQPDrD6CLgNowTfNhe1maTc2';
export const TWO_AUTH_AUTHORITY =
  '7VQGnwaBx4x3PiCLPTPWggm5zraaj6fJBfxZptJkiFMd';
// export const EURC_MINT = '9ykc4aZRdbycTD9fAjTVHKMKP8HgXyt6joJkaHpojnbq';
// export const EURC_MINT = '5v9VMn1T7X1SUuykRxsY72sT4NnsH5CcbrBxkd2149Qq';
export const EURC_MINT = 'CykBnb3ahHYssDWpETvZonzCo3Mh2VQ3zppv6Z5Azt7v';
export const APPROVER = '9TESAqVqs9B6x2o9zgkN2c4jtJk6efnVsB2piSfK6L8z';

// From spl-token
/** Address of the SPL Token program */
export const TOKEN_PROGRAM_ID = new web3.PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

/** Address of the SPL Token 2022 program */
export const TOKEN_2022_PROGRAM_ID = new web3.PublicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
);

/** Address of the SPL Associated Token Account program */
export const ASSOCIATED_TOKEN_PROGRAM_ID = new web3.PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);

/** Address of the special mint for wrapped native SOL in spl-token */
export const NATIVE_MINT = new web3.PublicKey(
  'So11111111111111111111111111111111111111112',
);

/** Address of the special mint for wrapped native SOL in spl-token-2022 */
export const NATIVE_MINT_2022 = new web3.PublicKey(
  '9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP',
);

export const SYSTEM_PROGRAM_ID = new web3.PublicKey(
  '11111111111111111111111111111111',
);
