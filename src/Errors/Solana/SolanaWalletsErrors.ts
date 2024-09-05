export enum SolanaWalletErrors {
  NoCredentialStored = 'errors:NoCredentialStored',
  NotEnoughSolBalanceToPayFees = 'errors:NotEnoughSolBalanceToPayFees',
  NotEnoughTokenBalance = 'errors:NotEnoughTokenBalance',
  TransactionNotFound = 'errors:TransactionNotFound',
  CouldntParseInstruction = 'errors:CouldntParseInstruction',
  WrongTransactionDirection = 'errors:WrongTransactionDirection',
  ErrorParsingTransaction = 'errors:ErrorParsingTransaction',
}

export enum IdlErrors {
  CouldntFindTransferInstruction = 'errors:CouldntFindTransferInstruction',
  UnknownInstruction = 'errors:UnknownInstruction',
}
