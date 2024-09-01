import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';
import IDL from '../../Anchor_IDL/asset_based.json';
import {TypedError} from '../../Errors/TypedError';
import {
  IdlErrors,
  SolanaWalletErrors,
} from '../../Errors/Solana/SolanaWalletsErrors';
import {Transaction} from '../../store/zustandStore';

interface TransferData {
  amount: bigint;
  decimals: number;
}

export function parseSolanaTransaction(
  txSig: string,
  txResponse: anchor.web3.TransactionResponse,
): Transaction {
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

  const transferAccounts = IDL.instructions.find(
    instruct => instruct.name === 'transfer',
  )?.accounts;

  if (!transferAccounts) {
    throw new TypedError(IdlErrors.CouldntFindTransferInstruction);
  }
  const senderIndex = transferAccounts.findIndex(
    elem => elem.name === 'source_owner',
  );
  const receiverIndex = transferAccounts.findIndex(
    elem => elem.name === 'destination_owner',
  );
  const mintIndex = transferAccounts.findIndex(elem => elem.name === 'mint');
  const wrapperIndex = transferAccounts.findIndex(
    elem => elem.name === 'wrapper_account',
  );
  const sender_owner = accountMetas[senderIndex].pubkey;
  const receiver_owner = accountMetas[receiverIndex].pubkey;
  const mint = accountMetas[mintIndex].pubkey;
  const wrapper = accountMetas[wrapperIndex].pubkey;

  console.log('testtttt');

  console.log(wrapper instanceof anchor.web3.PublicKey);
  console.log(wrapper);
  console.log(wrapper.toBase58());

  const args = ix.data as TransferData;

  const tx: Transaction = {
    txSig,
    timestamp: Number(txResponse.blockTime),
    from: sender_owner,
    to: receiver_owner,
    amount: Number(args.amount),
    mint,
    wrapper,
    native: false,
    decimals: args.decimals,
  };

  return tx;
}
