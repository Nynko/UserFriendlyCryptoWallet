import {Button, Text, View} from 'react-native';
import * as anchor from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';
import {PRIVATE_KEY, USER_KEY, MINT_PUB, WRAPPER} from '../tmp';
import {transferToken} from '../functions/solana/transfer';
import {
  accessAddress,
  accessSolanaWallet,
} from '../functions/wallet/solana_wallet';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';

export const TestTransfer = ({
  reloadBalances,
}: {
  reloadBalances: () => void;
}) => {
  const program = useAnchorProgram().program;
  const user1_pk = new Uint8Array(USER_KEY);
  const user1 = anchor.web3.Keypair.fromSecretKey(user1_pk);
  return (
    <View>
      <Text>Test Transfer to address user 1</Text>
      <Button
        title={'connect'}
        onPress={async () =>
          transfer(1, user1.publicKey, program).then(reloadBalances)
        }></Button>
    </View>
  );
};

export async function transfer(
  amount: number,
  to: anchor.web3.PublicKey,
  program: anchor.Program<HandmadeNaive>,
) {
  const signer = await accessSolanaWallet();
  const wrapper = new anchor.web3.PublicKey(WRAPPER);
  const mint = new anchor.web3.PublicKey(MINT_PUB);
  let wrappedToken = await accessAddress('WrappedAccount' + mint.toString());
  // let idendity = await accessAddress('Idendity');

  const secretKey = new Uint8Array(PRIVATE_KEY);
  const payer = anchor.web3.Keypair.fromSecretKey(secretKey);

  let twoAuth = await accessAddress('TwoAuth' + wrappedToken.toString());

  const [wrapped_to_account, bump] =
    await anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from('wrapped_token'),
        wrapper.toBuffer(),
        mint.toBuffer(),
        to.toBuffer(),
      ],
      program.programId,
    );

  await transferToken(
    amount,
    wrapper,
    signer,
    wrappedToken,
    to,
    wrapped_to_account,
    twoAuth,
    payer.publicKey,
    program,
  );
}
