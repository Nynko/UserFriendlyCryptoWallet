import {YStack} from 'tamagui';
import {useTransactions} from '../../../store/selectors';
import {DLT} from '../../../types/account';
import {TransactionRecap} from './TransactionRecap';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const gapRatio = height * 0.001;

export function LastTransactions() {
  const transactions = useTransactions(DLT.SOLANA).slice(-3).reverse();
  return (
    <YStack gap={20 * gapRatio}>
      {transactions.length !== 0 &&
        transactions.map(transaction => (
          <TransactionRecap key={transaction.txSig} transaction={transaction} />
        ))}
    </YStack>
  );
}
