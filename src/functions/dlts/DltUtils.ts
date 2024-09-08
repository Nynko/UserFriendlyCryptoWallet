import {DLT} from '../../types/account';

const cutThresholdSolana = (
  amount: number,
  mintRent: number,
  minFee: number = 0.00001, // We have two signers here
  decimals: number = 5,
): number => {
  if (amount < mintRent + minFee) {
    return 0;
  } else {
    const factor = Math.pow(10, decimals);
    return Math.round((amount - mintRent) * factor) / factor;
  }
};

export function adjustedBalance(
  dlt: DLT,
  balance: number,
  adjustementParam: number | null,
): number {
  switch (dlt) {
    case DLT.SOLANA:
      const rentMinimum = adjustementParam;
      const adjustedSolBalance = rentMinimum
        ? cutThresholdSolana(balance, rentMinimum)
        : 0;
      return adjustedSolBalance;
  }
}
