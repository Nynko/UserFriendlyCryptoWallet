import {AnoncredsSolana} from '../../Anchor_IDL/anoncreds_solana';
import {Program} from '@coral-xyz/anchor';
import {createContext, useContext} from 'react';
import {AssetBased} from '../../Anchor_IDL/asset_based';

export interface AnchorProgramContextState {
  program: Program<AssetBased>;
  anoncredsProgram: Program<AnoncredsSolana>;
}

export const AnchorProgramContext = createContext<AnchorProgramContextState>(
  {} as AnchorProgramContextState,
);

export function useAnchorProgram(): AnchorProgramContextState {
  return useContext(AnchorProgramContext);
}
