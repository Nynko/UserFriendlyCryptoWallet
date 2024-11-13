import {Dimensions, StyleSheet, Text} from 'react-native';
import {Direction, DLT, Transaction} from '../../../types/account';
import {useMintAddresses, usePseudos} from '../../../store/selectors';
import {Spinner, View, XStack} from 'tamagui';
import * as anchor from '@coral-xyz/anchor';
import {useAnchorProgram} from '../../../hooks/contexts/useAnchorProgram';
import {useEffect, useState} from 'react';
import {fetchPseudo} from '../../../store/actions';

interface TransactionComponentProps {
  transaction: Transaction;
}

export function TransactionRecap({transaction}: TransactionComponentProps) {
  const mint = useMintAddresses(
    DLT.SOLANA,
    transaction.wrapper.toBase58(),
    transaction.mint.toBase58(),
  );
  const symbol = mint.name;

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

  let minus = '';
  let color = '#ffffff';
  switch (transaction.direction) {
    case Direction.SELF_TRANSFER:
      minus = '±';
      break;
    case Direction.INCOMING:
      minus = '+';
      color = '#00ffb2';
      break;
    case Direction.OUTGOING:
      minus = '-';
      break;
  }

  if (pseudo === null) {
    return (
      <>
        <Spinner size="small" color="$gray" />
      </>
    );
  }
  return (
    <XStack style={{flexDirection: 'row'}}>
      <Text style={style.pseudo}>{`${pseudo.slice(0, 15)}${
        pseudo.length > 15 ? '...' : ''
      }`}</Text>
      <View style={{flex: 1}} />
      <Text style={[style.value, {color: color}]}>{`${minus} ${
        transaction.amount / 10 ** transaction.decimals
      } ${symbol}`}</Text>
    </XStack>
  );
}

const {height} = Dimensions.get('window');
const style = StyleSheet.create({
  pseudo: {
    fontWeight: '300',
    fontSize: 16 * height * 0.001,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    textAlign: 'left',
  },
  value: {
    fontWeight: '300',
    fontSize: 16 * height * 0.001,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    textAlign: 'right',
  },
});
