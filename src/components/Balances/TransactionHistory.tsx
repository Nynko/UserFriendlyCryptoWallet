import {Text, View} from 'react-native';
import {appStore} from '../../store/zustandStore';
import {DLT} from '../../types/account';

export function TransactionHistory() {
  const transactions = appStore(state => state.dlts[DLT.SOLANA].transactions);
  return (
    <>
      <Text>Transaction History</Text>
      {transactions.length !== 0 &&
        transactions.map(transaction => (
          <View key={transaction.txSig}>
            <Text>From: {transaction.from.toBase58()}</Text>
            <Text>To: {transaction.to.toBase58()}</Text>
            <Text>Amount: {transaction.amount}</Text>
            <Text>Native: {transaction.native.toString()}</Text>
            <Text>Decimals: {transaction.decimals}</Text>
          </View>
        ))}
    </>
  );
}
