import {Text} from 'react-native';
import {Direction, type NativeTransaction} from '../../types/account';
import {usePseudos} from '../../store/selectors';
import {getPseudo} from '../../functions/solana/getPseudo';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {useEffect, useState} from 'react';
import {ListItem, Spinner} from 'tamagui';
import * as anchor from '@coral-xyz/anchor';
import {useTranslation} from 'react-i18next';
import {toDate} from '../../utils/time';

interface TransactionProps {
  transaction: NativeTransaction;
}

export function NativeTransaction({transaction}: TransactionProps) {
  const pseudos = usePseudos();
  const program = useAnchorProgram().program;
  const [pseudo, setPseudo] = useState<string | null>(null);
  const {t} = useTranslation();

  const symbol = 'SOL';

  useEffect(() => {
    const updateLocalPseudo = async (address: anchor.web3.PublicKey) => {
      const addressBase58 = address.toBase58();
      const cachedPseudo = pseudos[addressBase58];
      if (cachedPseudo) {
        setPseudo(cachedPseudo);
      } else {
        const fetchedPseudo = await getPseudo(address, program);
        setPseudo(fetchedPseudo || addressBase58);
      }
    };

    if (
      transaction.address &&
      transaction.direction !== Direction.SELF_TRANSFER
    ) {
      updateLocalPseudo(transaction.address);
    }
  }, [transaction, pseudos, program]);

  let title = '';
  switch (transaction.direction) {
    case Direction.SELF_TRANSFER:
      title = 'transactions:SelfTransfer';
      break;
    case Direction.INCOMING:
      title = 'transactions:Incoming';
      break;
    case Direction.OUTGOING:
      title = 'transactions:Outgoing';
      break;
    default:
      break;
  }

  if (!pseudo) {
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
