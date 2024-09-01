import {useState, type FC, type ReactNode} from 'react';
import {useMMKV} from 'react-native-mmkv';
import {
  SolanaTransactionsContext,
  SolanaTransactionsContextState,
  SolanaTransactionsDispatchContext,
} from '../../hooks/contexts/useTransactions';
import {produce} from 'immer';
import * as anchor from '@coral-xyz/anchor';

export const AccountDispatchProvider: FC<{
  children: ReactNode;
}> = ({children}) => {
  const mmkv = useMMKV();

  const [transactions, setTransactions] =
    useState<SolanaTransactionsContextState>(() => {
      const txs = mmkv.getString('transactions');
      if (txs) {
        return JSON.parse(txs);
      }
      return {
        wrappers: {},
        nativeTransactions: [],
      };
    });

  function addTransaction(
    transactionState: SolanaTransactionsContextState,
    transaction: anchor.web3.Transaction,
    txId: string,
  ) {
    const txs = produce(transactionState, draftState => {
      draftState.nativeTransactions.push({txId, tx: transaction});
    });
    setTransactions(txs);
    mmkv.set('transactions', JSON.stringify(txs));
  }

  return (
    <SolanaTransactionsContext.Provider value={transactions}>
      <SolanaTransactionsDispatchContext.Provider value={{addTransaction}}>
        {children}
      </SolanaTransactionsDispatchContext.Provider>
    </SolanaTransactionsContext.Provider>
  );
};
