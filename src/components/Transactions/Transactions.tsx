import {
  Direction,
  NativeTransaction,
  type Transaction,
  TransactionType,
} from '../../types/account';
import {usePseudos} from '../../store/selectors';
import {getPseudo} from '../../functions/solana/getPseudo';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {useEffect, useState} from 'react';
import {ListItem, Spinner} from 'tamagui';
import * as anchor from '@coral-xyz/anchor';
import {NativeTransactionComponent} from './NativeTransaction';
import {TransactionComponent} from './Transaction';

interface TransactionsProps {
  transaction: Transaction | NativeTransaction;
}

export function Transactions({transaction}: TransactionsProps) {
  const pseudos = usePseudos();
  const program = useAnchorProgram().program;

  const [pseudo, setPseudo] = useState<string | null>(null);

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

    if (transaction.address) {
      updateLocalPseudo(transaction.address);
    }
  }, [transaction, pseudos, program]);

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
