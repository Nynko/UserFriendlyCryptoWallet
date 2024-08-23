import * as anchor from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';

export async function getAddressFromPseudo(
  pseudo: string,
  program: anchor.Program<AssetBased>,
): Promise<anchor.web3.PublicKey | null> {
  const [pseudo_account, _bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('pseudo'), Buffer.from(pseudo)],
    program.programId,
  );

  const account = await program.account.pseudoAccount.fetchNullable(
    pseudo_account,
  );
  console.log(account);

  return account ? account.owner : null;
}
