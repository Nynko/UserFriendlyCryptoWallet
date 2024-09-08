import {Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {typography} from '../../../styles/typography';
import {mainStyle} from '../../../styles/style';
import {DLT} from '../../types/account';
import {getMinimumRent} from '../../functions/solana/getBalances';
import {
  useMintAddresses,
  useMintBalance,
  useNativeBalance,
} from '../../store/selectors';
import {adjustedBalance} from '../../functions/dlts/DltUtils';
import * as anchor from '@coral-xyz/anchor';

export const HomeBalances = ({
  dlt,
  wrapper,
  mint,
  price,
}: {
  dlt: DLT;
  wrapper: string;
  mint: string;
  price: number;
}) => {
  console.log('Rendering HomeBalances component start');
  const program = useAnchorProgram().program;
  const mintData = useMintAddresses(dlt, wrapper, mint);
  const balances = useMintBalance(dlt, wrapper, mint);
  const mintBalance = Number(balances.balance) / 10 ** balances.decimals;
  const nativeBalance = useNativeBalance(dlt);

  const [rentMinimum, setRentMinimum] = useState<number | null>(null);

  const adjustedSolBalance = adjustedBalance(
    dlt,
    Number(nativeBalance) / anchor.web3.LAMPORTS_PER_SOL,
    rentMinimum,
  );

  useEffect(() => {
    if (dlt === DLT.SOLANA) {
      const fetchRentMinimum = async () => {
        getMinimumRent(0, program.provider.connection).then(setRentMinimum);
      };
      fetchRentMinimum();
    }
  }, [dlt, program.provider.connection]);

  const total_eur = mintBalance * price || 0;

  console.log('Rendering HomeBalances component');

  return (
    <View style={mainStyle.centered}>
      <Text style={typography.thinTitle}>{`${total_eur.toFixed(2)} € `}</Text>
      <Text
        style={
          typography.thinSmaller
        }>{`${mintBalance} ${mintData.name}`}</Text>
      <Text
        style={
          typography.subtitleText
        }>{`${adjustedSolBalance} SOL ${'for fees'}`}</Text>
    </View>
  );
};
