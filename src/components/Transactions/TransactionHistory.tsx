import {appStore} from '../../store/zustandStore';
import {DLT, TransactionType} from '../../types/account';
import {Transaction} from './Transaction';
import {YGroup} from 'tamagui';
import {NativeTransaction} from './NativeTransaction';

export function TransactionHistory() {
  const transactions = appStore(state => state.dlts[DLT.SOLANA].transactions)
    .slice()
    .reverse();
  return (
    <>
      {transactions.length !== 0 &&
        transactions.map(transaction => (
          <YGroup
            alignSelf="center"
            width={300}
            size="$4"
            key={transaction.txSig}>
            <YGroup.Item>
              {transaction.discriminator === TransactionType.Transaction && (
                <Transaction transaction={transaction} />
              )}
              {transaction.discriminator ===
                TransactionType.NativeTransaction && (
                <NativeTransaction transaction={transaction} />
              )}
            </YGroup.Item>
          </YGroup>
        ))}
    </>
  );
}
