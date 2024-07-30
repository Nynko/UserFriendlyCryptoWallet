import {Connection, type ConnectionConfig} from '@solana/web3.js';
import React, {type FC, type ReactNode, useMemo} from 'react';
import * as anchor from '@coral-xyz/anchor';
import {HandmadeNaive} from '../Anchor_IDL/handmade_naive';
import IDL from '../Anchor_IDL/handmade_naive.json';
import {Program} from '@coral-xyz/anchor';
import {createContext, useContext} from 'react';
import {AnchorProgramContext} from '../hooks/contexts/useAnchorProgram';
import {useConnection} from '@solana/wallet-adapter-react';

export const AnchorProgramProvider: FC<{children: ReactNode}> = ({
  children,
}) => {
  const connection = useConnection().connection;
  const program = useMemo(
    () =>
      new Program<HandmadeNaive>(IDL as HandmadeNaive, {
        connection,
      }),
    [connection],
  );
  return (
    <AnchorProgramContext.Provider value={{program}}>
      {children}
    </AnchorProgramContext.Provider>
  );
};
