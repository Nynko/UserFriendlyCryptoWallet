import {Text} from 'react-native';
import {appStore} from '../../store/zustandStore';
import {DLT} from '../../types/account';
import {Transaction} from './Transaction';

export function TransactionHistory() {
  const transactions = appStore(state => state.dlts[DLT.SOLANA].transactions);
  return (
    <>
      <Text>Transaction History</Text>
      {transactions.length !== 0 &&
        transactions.map(transaction => (
          <Transaction key={transaction.txSig} transaction={transaction} />
        ))}
    </>
  );
}
