import {appStore} from '../../store/zustandStore';
import {DLT} from '../../types/account';
import {Transactions} from './Transactions';
import {YGroup} from 'tamagui';

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
              <Transactions transaction={transaction} />
            </YGroup.Item>
          </YGroup>
        ))}
    </>
  );
}
