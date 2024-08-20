import {HandmadeNaive} from '../../Anchor_IDL/handmade_naive';
import {AnoncredsSolana} from '../../Anchor_IDL/anoncreds_solana';
import {Program} from '@coral-xyz/anchor';
import {createContext, useContext} from 'react';

export interface AnchorProgramContextState {
  program: Program<HandmadeNaive>;
  anoncredsProgram : Program<AnoncredsSolana>;
}

export const AnchorProgramContext = createContext<AnchorProgramContextState>(
  {} as AnchorProgramContextState,
);

export function useAnchorProgram(): AnchorProgramContextState {
  return useContext(AnchorProgramContext);
}
