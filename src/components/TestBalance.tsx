import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {useState} from 'react';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';
import {getWrappedAccount} from '../functions/get_wrapped_account';
import {accessAddress} from '../functions/solana_wallet';
import {publicKey} from '@coral-xyz/anchor/dist/cjs/utils';
import {getBalance} from '../functions/get_account';
import { MINT_PUB } from '../tmp';

export const TestBalance = () => {
  const [tokenBalance, setTokenBalance] = useState<anchor.BN | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const program = useAnchorProgram().program;
  const mint = new anchor.web3.PublicKey(
    MINT_PUB,
  );

  return (
    <View>
      <Text>Test get token Balance</Text>
      <Button
        title={'Get Balance'}
        onPress={async () =>
          accessAddress('WrappedAccount' + mint.toString()).then(
            async wrappedAccount =>
              getWrappedAccount(wrappedAccount, program).then(account =>
                setTokenBalance(account.amount),
              ),
          )
        }></Button>
      <Text>{tokenBalance ? tokenBalance.toString() : null}</Text>
      <Text>Test get Sol Balance</Text>
      <Button
        title={'Get Sol Balance'}
        onPress={async () =>
          accessAddress('PublicKey').then(async publicKey =>
            getBalance(program.provider.connection, publicKey).then(
              async balance => setSolBalance(balance),
            ),
          )
        }></Button>
      <Text>{solBalance}</Text>
    </View>
  );
};
