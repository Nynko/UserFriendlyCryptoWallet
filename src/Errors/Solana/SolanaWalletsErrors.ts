export enum SolanaWalletErrors {
  NoCredentialStored = 'errors:NoCredentialStored',
  NotEnoughSolBalanceToPayFees = 'errors:NotEnoughSolBalanceToPayFees',
  NotEnoughTokenBalance = 'errors:NotEnoughTokenBalance',
  TransactionNotFound = 'errors:TransactionNotFound',
  CouldntParseInstruction = 'errors:CouldntParseInstruction',
}

export enum IdlErrors {
  CouldntFindTransferInstruction = 'errors:CouldntFindTransferInstruction',
}
