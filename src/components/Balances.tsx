import {Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';
import {getBalance, getMinimumRent} from '../functions/solana/get_account';

import {typography} from '../../styles/typography';
import {mainStyle} from '../../styles/style';
import {SolToEur} from '../functions/prices/get_prices';
import {useAddresses} from '../hooks/contexts/useAddresses';
import {getWrappedAccount} from '../functions/solana/getWrappedAccountBalance';

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

export const Balances = ({
  isBalanceReloading,
}: {
  isBalanceReloading: boolean;
}) => {
  const addresses = useAddresses();
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const program = useAnchorProgram().program;

  const [rentMinimum, setRentMinimum] = useState<number | null>(null);
  const adjustedSolBalance =
    solBalance && rentMinimum ? cutThreshold(solBalance, rentMinimum) : 0;

  useEffect(() => {
    const fetchRentMinimum = async () => {
      getMinimumRent(0, program.provider.connection).then(setRentMinimum);
    };
    fetchRentMinimum();
  }, [program.provider.connection]);

  useEffect(() => {
    async function updateBalances() {
      getBalance(program.provider.connection, addresses.pubKey).then(
        async balance => setSolBalance(balance),
      );

      getWrappedAccount(addresses.wrappedToken, program).then(setTokenBalance);
    }

    updateBalances();
  }, [isBalanceReloading, addresses, program]);

  const total_eur = (tokenBalance || 0) + SolToEur(adjustedSolBalance);

  return (
    <View style={mainStyle.container}>
      <Text style={typography.thinTitle}>{`${total_eur.toFixed(2)} € `}</Text>
      <Text style={typography.thinSmaller}>{`${tokenBalance} EURC`}</Text>
      <Text
        style={
          typography.subtitleText
        }>{`${adjustedSolBalance} SOL ${'for fees'}`}</Text>
      <Text style={typography.smallText}> ... </Text>
      <Text style={typography.smallText}> See more </Text>
    </View>
  );
};
