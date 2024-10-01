import {useTransactions} from '../../store/selectors';
import {DLT} from '../../types/account';
import {Transactions} from './Transactions';
import {YGroup} from 'tamagui';

export function TransactionHistory() {
  const transactions = useTransactions(DLT.SOLANA).slice().reverse();
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
