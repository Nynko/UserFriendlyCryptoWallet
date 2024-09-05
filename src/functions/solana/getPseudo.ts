import {Program} from '@coral-xyz/anchor';
import {AssetBased} from '../../Anchor_IDL/asset_based';
import * as anchor from '@coral-xyz/anchor';
import {getIdendityAddress} from './getDerivedAddresses';

export async function getPseudo(
  address: anchor.web3.PublicKey,
  program: Program<AssetBased>,
): Promise<string | null> {
  const idAddress = getIdendityAddress(address, program);
  const idAccount = await program.account.idAccount.fetchNullable(idAddress);
  if (!idAccount) {
    return null;
  }
  if (!idAccount.associatedPseudo) {
    return null;
  }
  const pseudoAccount = await program.account.pseudoAccount.fetch(
    idAccount.associatedPseudo,
  );

  return pseudoAccount.pseudo;
}
