import {Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {useEffect, useState} from 'react';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';
import {getWrappedAccount} from '../functions/get_wrapped_account';
import {accessAddress} from '../functions/solana_wallet';
import {getBalance} from '../functions/get_account';
import { MINT_PUB } from '../tmp';
import { sleep } from '../utils/async';

import { material } from 'react-native-typography'
import { typography } from '../../styles/typography';
import { styles } from '../../styles/style';
import { SolToEur } from '../functions/prices/get_prices';

export const Balances = ({isBalanceReloading}:{isBalanceReloading: boolean}) => {
  const [tokenBalance, setTokenBalance] = useState<anchor.BN | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const program = useAnchorProgram().program;
  const mint = new anchor.web3.PublicKey(
    MINT_PUB,
  );

  useEffect(
    () => {

        async function updateBalances(){

            accessAddress('PublicKey').then(async publicKey =>
                getBalance(program.provider.connection, publicKey).then(
                  async balance => setSolBalance(balance),
                ),
              )
            accessAddress('WrappedAccount' + mint.toString()).then(
                async wrappedAccount =>
                  getWrappedAccount(wrappedAccount, program).then(account =>
                    setTokenBalance(account.amount),
                  ),
              )
        }

        updateBalances();

    }, [isBalanceReloading]
  )

  const total_eur = ((Number(tokenBalance) || 0) + SolToEur(solBalance || 0));

  return (
    <View style={styles.container}>
      <Text style={typography.thinTitle}>{`${total_eur.toFixed(2)} € `}</Text>
      <Text style={typography.thinSmaller}>{`${tokenBalance ? tokenBalance.toString() : null} EURC`}</Text>
      <Text style={typography.thinSmaller}>{`${solBalance} SOL`}</Text>
      <Text style={typography.smallText}> ... </Text>
      <Text style={typography.smallText}> See more </Text>
    </View>
  );
};
