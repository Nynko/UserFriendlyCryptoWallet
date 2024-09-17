import {Text} from 'react-native';
import {DLT, Transaction} from '../../types/account';
import {useMintAddresses} from '../../store/selectors';
import {ListItem, Spinner} from 'tamagui';
import {useTranslation} from 'react-i18next';
import {toDate} from '../../utils/time';

interface TransactionComponentProps {
  transaction: Transaction;
  pseudo: string | null;
  title: string;
}

export function TransactionComponent({
  transaction,
  pseudo,
  title,
}: TransactionComponentProps) {
  const {t} = useTranslation();
  const mint = useMintAddresses(
    DLT.SOLANA,
    transaction.wrapper.toBase58(),
    transaction.mint.toBase58(),
  );
  const symbol = mint.name;

  if (pseudo === null) {
    return (
      <ListItem>
        <Spinner size="small" color="$blue" />
      </ListItem>
    );
  }

  return (
    <ListItem
      title={`${t(title)} ${pseudo}`}
      subTitle={toDate(transaction.timestamp).toLocaleString()}>
      <Text>{`Amount: ${
        transaction.amount / 10 ** transaction.decimals
      } ${symbol}`}</Text>
    </ListItem>
  );
}
