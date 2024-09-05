import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';
import IDL from '../../Anchor_IDL/asset_based.json';
import {TypedError} from '../../Errors/TypedError';
import {
  IdlErrors,
  SolanaWalletErrors,
} from '../../Errors/Solana/SolanaWalletsErrors';
import {Direction, Transaction, TransactionType} from '../../types/account';

interface TransferData {
  amount: bigint;
  decimals: number;
}

export function parseSolanaTransaction(
  txSig: string,
  account: anchor.web3.PublicKey,
  txResponse: anchor.web3.TransactionResponse,
): Transaction | undefined {
  const coder = new anchor.BorshCoder(IDL as AssetBased);
  const ix = coder.instruction.decode(
    txResponse.transaction.message.instructions[0].data,
    'base58',
  );

  if (!ix) {
    throw new TypedError(SolanaWalletErrors.CouldntParseInstruction);
  }

  const accountMetas =
    txResponse.transaction.message.instructions[0].accounts.map(idx => ({
      pubkey: txResponse.transaction.message.accountKeys[idx],
      isSigner: txResponse.transaction.message.isAccountSigner(idx),
      isWritable: txResponse.transaction.message.isAccountWritable(idx),
    }));

  const formatted = coder.instruction.format(ix, accountMetas);
  console.log('ix', ix);

  let sender_owner_name: string;
  let receiver_owner_name: string;
  switch (ix.name) {
    case 'transfer':
      sender_owner_name = 'source_owner';
      receiver_owner_name = 'destination_owner';
      break;
    case 'wrap_tokens':
      sender_owner_name = 'owner_from_token_account';
      receiver_owner_name = 'owner_to_account';
      break;
    case 'initialize_id':
      return;
    default:
      throw new TypedError(IdlErrors.UnknownInstruction);
  }

  console.log('formatted', formatted);

  const sender_owner = formatted?.accounts.find(
    elem => elem.name?.toLowerCase() === sender_owner_name,
  )?.pubkey;
  const receiver_owner = formatted?.accounts.find(
    elem => elem.name?.toLowerCase() === receiver_owner_name,
  )?.pubkey;
  const mint = formatted?.accounts.find(
    elem => elem.name?.toLowerCase() === 'mint',
  )?.pubkey;
  const wrapper = formatted?.accounts.find(
    elem => elem.name?.toLowerCase() === 'wrapper_account',
  )?.pubkey;

  if (!sender_owner || !receiver_owner || !mint || !wrapper) {
    throw new TypedError(SolanaWalletErrors.ErrorParsingTransaction);
  }

  const args = ix.data as TransferData;

  let senderReceiver: Direction;
  let address = account;
  if (account.equals(sender_owner) && account.equals(receiver_owner)) {
    senderReceiver = Direction.SELF_TRANSFER;
  } else if (account.equals(sender_owner)) {
    senderReceiver = Direction.OUTGOING;
    address = receiver_owner;
  } else if (account.equals(receiver_owner)) {
    senderReceiver = Direction.INCOMING;
    address = sender_owner;
  } else {
    throw new TypedError(SolanaWalletErrors.WrongTransactionDirection);
  }

  const tx: Transaction = {
    discriminator: TransactionType.Transaction,
    txSig,
    timestamp: Number(txResponse.blockTime),
    direction: senderReceiver,
    address,
    amount: Number(args.amount),
    mint,
    wrapper,
    decimals: args.decimals,
  };

  return tx;
}
