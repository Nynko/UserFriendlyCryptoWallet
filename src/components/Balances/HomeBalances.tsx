import {Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import * as anchor from '@coral-xyz/anchor';
import {typography} from '../../../styles/typography';
import {mainStyle} from '../../../styles/style';
import {SolToEur} from '../../functions/prices/get_prices';
import {DLT} from '../../types/account';
import {EURC_MINT, WRAPPER_PDA} from '../../const';
import {getMinimumRent} from '../../functions/solana/getBalances';
import {useMintBalance, useNativeBalance} from '../../store/selectors';

const cutThreshold = (
  amount: number,
  mintRent: number,
  minFee: number = 0.00001, // We have two signers here
  decimals: number = 5,
): number => {
  if (amount < mintRent + minFee) {
    return 0;
  } else {
    const factor = Math.pow(10, decimals);
    return Math.round((amount - mintRent) * factor) / factor;
  }
};

export const HomeBalances = () => {
  const program = useAnchorProgram().program;

  const balances = useMintBalance(DLT.SOLANA, WRAPPER_PDA, EURC_MINT);
  const eurcBalance = Number(balances.balance) / 10 ** balances.decimals;
  const nativeBalance =
    Number(useNativeBalance(DLT.SOLANA)) / anchor.web3.LAMPORTS_PER_SOL;
  const [rentMinimum, setRentMinimum] = useState<number | null>(null);
  const adjustedSolBalance = rentMinimum
    ? cutThreshold(nativeBalance, rentMinimum)
    : 0;

  useEffect(() => {
    const fetchRentMinimum = async () => {
      getMinimumRent(0, program.provider.connection).then(setRentMinimum);
    };
    fetchRentMinimum();
  }, [program.provider.connection]);

  const total_eur = (eurcBalance || 0) + SolToEur(adjustedSolBalance);

  return (
    <View style={mainStyle.container}>
      <Text style={typography.thinTitle}>{`${total_eur.toFixed(2)} € `}</Text>
      <Text style={typography.thinSmaller}>{`${eurcBalance} EURC`}</Text>
      <Text
        style={
          typography.subtitleText
        }>{`${adjustedSolBalance} SOL ${'for fees'}`}</Text>
      <Text style={typography.smallText}> ... </Text>
      <Text style={typography.smallText}> See more </Text>
    </View>
  );
};
