import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';

export async function getDeriveAddresses(
  mint: anchor.web3.PublicKey,
  wrapper: anchor.web3.PublicKey,
  pk: anchor.web3.PublicKey,
  program: anchor.Program<AssetBased>,
): Promise<[anchor.web3.PublicKey, anchor.web3.PublicKey]> {
  const [wrappedToken] = await anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('wrapped_token'),
      wrapper.toBuffer(),
      mint.toBuffer(),
      pk.toBuffer(),
    ],
    program.programId,
  );
  const [idendity] = await anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('identity'), pk.toBuffer()],
    program.programId,
  );

  return [wrappedToken, idendity];
}