import {Text, View} from 'react-native';
import {DLT, SenderReiceiver, type Transaction} from '../../types/account';
import {useAccountPseudo, usePseudos} from '../../store/selectors';
import {getPseudo} from '../../functions/solana/getPseudo';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {useEffect, useState} from 'react';

interface TransactionProps {
  transaction: Transaction;
}

export function Transaction({transaction}: TransactionProps) {
  const pseudos = usePseudos();
  const accountPseudo = useAccountPseudo(DLT.SOLANA);
  const program = useAnchorProgram().program;

  const [from_pseudo, setFrom_pseudo] = useState<string>('');
  const [to_pseudo, setTo_pseudo] = useState<string>('');

  useEffect(() => {
    switch (transaction.senderReceiver) {
      case SenderReiceiver.SENDER:
        setFrom_pseudo(accountPseudo);
        const pseudo = pseudos[transaction.to.toBase58()];
        if (pseudo) {
          setTo_pseudo(pseudo);
        } else {
          getPseudo(transaction.to, program).then(_pseudo => {
            if (_pseudo) {
              setTo_pseudo(_pseudo);
            } else {
              setTo_pseudo(transaction.to.toBase58());
            }
          });
        }
        break;
      case SenderReiceiver.RECEIVER:
        setTo_pseudo(accountPseudo);
        const pseudo2 = pseudos[transaction.from.toBase58()];
        if (pseudo2) {
          setFrom_pseudo(pseudo2);
        } else {
          getPseudo(transaction.from, program).then(_pseudo => {
            if (_pseudo) {
              setFrom_pseudo(_pseudo);
            } else {
              setFrom_pseudo(transaction.from.toBase58());
            }
          });
        }
        break;
      case SenderReiceiver.SELF_TRANSFER:
        setFrom_pseudo(accountPseudo);
        setTo_pseudo(accountPseudo);
        break;

      default:
        break;
    }
  }, [transaction, accountPseudo, pseudos, program]);

  return (
    <View>
      <Text>From: {from_pseudo}</Text>
      <Text>To: {to_pseudo}</Text>
      <Text>Amount: {transaction.amount / 10 ** transaction.decimals}</Text>
    </View>
  );
}
