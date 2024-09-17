import {Text} from 'react-native';
import {type NativeTransaction} from '../../types/account';
import {ListItem, Spinner} from 'tamagui';
import {toDate} from '../../utils/time';
import {useTranslation} from 'react-i18next';

interface NativeTransactionComponentProps {
  transaction: NativeTransaction;
  pseudo: string | null;
  title: string;
}

export function NativeTransactionComponent({
  transaction,
  pseudo,
  title,
}: NativeTransactionComponentProps) {
  const symbol = 'SOL';
  const {t} = useTranslation();

  if (pseudo === null) {
    return (
      <ListItem>
        <Spinner size="small" color="$blue" />
      </ListItem>
    );
  }

  return (
    <ListItem
      title={`${t(title)} ${
        transaction.amount / 10 ** transaction.decimals
      } ${symbol} (Native)`}
      subTitle={toDate(transaction.timestamp).toLocaleString()}>
      <Text>Amount: {transaction.amount / 10 ** transaction.decimals}</Text>
    </ListItem>
  );
}
