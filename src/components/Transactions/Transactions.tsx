import {
  Direction,
  NativeTransaction,
  type Transaction,
  TransactionType,
} from '../../types/account';
import {usePseudos} from '../../store/selectors';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {useEffect, useState} from 'react';
import {ListItem, Spinner} from 'tamagui';
import * as anchor from '@coral-xyz/anchor';
import {NativeTransactionComponent} from './NativeTransaction';
import {TransactionComponent} from './Transaction';
import {fetchPseudo} from '../../store/actions';

interface TransactionsProps {
  transaction: Transaction | NativeTransaction;
}

export function Transactions({transaction}: TransactionsProps) {
  const pseudos = usePseudos();
  const program = useAnchorProgram().program;
  const addressBase58 = transaction.address.toBase58();
  const cachedPseudo = pseudos[addressBase58] || null;
  const [pseudo, setPseudo] = useState<string | null>(cachedPseudo);

  useEffect(() => {
    const updateLocalPseudo = async (address: anchor.web3.PublicKey) => {
      const fetchedPseudo = await fetchPseudo(address, program);
      setPseudo(fetchedPseudo || addressBase58);
    };

    if (!cachedPseudo) {
      updateLocalPseudo(transaction.address);
    }
  }, [cachedPseudo, program, addressBase58, transaction.address]);

  let title = '';
  switch (transaction.direction) {
    case Direction.SELF_TRANSFER:
      title = 'transactions:SelfTransfer';
      break;
    case Direction.INCOMING:
      title = 'transactions:IncomingFrom';
      break;
    case Direction.OUTGOING:
      title = 'transactions:OutgoingTo';
      break;
  }

  if (pseudo === null) {
    return (
      <ListItem>
        <Spinner size="small" color="$blue" />
      </ListItem>
    );
  }

  return (
    <>
      {transaction.discriminator === TransactionType.NativeTransaction ? (
        <NativeTransactionComponent
          transaction={transaction}
          pseudo={pseudo}
          title={title}
        />
      ) : (
        <TransactionComponent
          transaction={transaction}
          pseudo={pseudo}
          title={title}
        />
      )}
    </>
  );
}
