import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {useState} from 'react';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';
import {accessAddress} from '../functions/wallet/solana_wallet';
import {publicKey} from '@coral-xyz/anchor/dist/cjs/utils';
import {airdropSol, airdropToken} from '../functions/tmp_airdrop';
import {MINT_PUB} from '../tmp';

export const Airdrop = ({reloadBalances}: {reloadBalances: () => void}) => {
  const program = useAnchorProgram().program;

  return (
    <View>
      <Text>Airdrop Sol</Text>
      <Button
        title={'Airdrop Sol'}
        onPress={async () =>
          accessAddress('PublicKey')
            .then(async publicKey => airdropSol(publicKey, program))
            .then(reloadBalances)
        }></Button>
      <Text>Airdrop Wrapped Token</Text>
      <Button
        title={'Airdrop Wrapped token'}
        onPress={async () =>
          accessAddress('PublicKey')
            .then(async publicKey => airdropToken(publicKey, program))
            .then(reloadBalances)
        }></Button>
    </View>
  );
};
