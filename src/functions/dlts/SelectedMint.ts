import {DLT} from '../../types/account';

export interface SelectedMint {
  dlt: DLT;
  wrapper: string;
  mint: string;
}

export function isSelectedMintEquals(elem1: SelectedMint, elem2: SelectedMint) {
  return (
    elem1.dlt === elem2.dlt &&
    elem1.mint === elem2.mint &&
    elem1.wrapper === elem2.wrapper
  );
}
