import {type FC, type ReactNode, useMemo} from 'react';
import {AnoncredsSolana} from '../../Anchor_IDL/anoncreds_solana';
import AnonIDL from '../../Anchor_IDL/anoncreds_solana.json';
import IDL from '../../Anchor_IDL/asset_based.json';
import {Program} from '@coral-xyz/anchor';
import {AnchorProgramContext} from '../../hooks/contexts/useAnchorProgram';
import {useConnection} from '@solana/wallet-adapter-react';
import {AssetBased} from '../../Anchor_IDL/asset_based';

export const AnchorProgramProvider: FC<{children: ReactNode}> = ({
  children,
}) => {
  const connection = useConnection().connection;
  const [program, anoncredsProgram] = useMemo(
    () => [
      new Program<AssetBased>(IDL as AssetBased, {
        connection,
      }),
      new Program<AnoncredsSolana>(AnonIDL as AnoncredsSolana, {connection}),
    ],
    [connection],
  );
  return (
    <AnchorProgramContext.Provider value={{program, anoncredsProgram}}>
      {children}
    </AnchorProgramContext.Provider>
  );
};
