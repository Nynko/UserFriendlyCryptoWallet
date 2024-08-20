// import {Connection, type ConnectionConfig} from '@solana/web3.js';
// import React, {type FC, type ReactNode, useMemo} from 'react';
// import * as anchor from '@coral-xyz/anchor';
// import {HandmadeNaive} from '../../Anchor_IDL/handmade_naive';
// import IDL from '../../Anchor_IDL/handmade_naive.json';
// import {Program} from '@coral-xyz/anchor';
// import {createContext, useContext} from 'react';
// import {AnchorProgramContext} from '../../hooks/contexts/useAnchorProgram';
// import {useConnection} from '@solana/wallet-adapter-react';
// import { MINT_PUB, WRAPPER } from '../../tmp';
// import { accessAddress } from '../../functions/solana_wallet';
// import { AddressesContext } from '../../hooks/contexts/useAddresses';

// export const SolanaAddresses: FC<{children: ReactNode}> = ({
//   children,
// }) => {
//   const addresses = useMemo(
//     async () =>{

//       const wrapper = new anchor.web3.PublicKey(
//           WRAPPER,
//         );
//         const mint = new anchor.web3.PublicKey(
//           MINT_PUB,
//         );
//       let wrappedToken = await accessAddress('WrappedAccount' + mint.toString());
//       let idendity = await accessAddress('Idendity');
//       let twoAuth = await accessAddress('TwoAuth' + wrappedToken.toString());
    
//       return [wrappedToken, idendity, twoAuth]
//     },
//     []
//   );
//   return (
//     <AddressesContext.Provider value={{wrappedToken:addresses[0], idendity: addresses[1], twoAuth: addresses[2]}}>
//       {children}
//     </AddressesContext.Provider>
//   );
// };



// async function func(){

//   const wrapper = new anchor.web3.PublicKey(
//       WRAPPER,
//     );
//     const mint = new anchor.web3.PublicKey(
//       MINT_PUB,
//     );
//   let wrappedToken = await accessAddress('WrappedAccount' + mint.toString());
//   let idendity = await accessAddress('Idendity');
//   let twoAuth = await accessAddress('TwoAuth' + wrappedToken.toString());

//   return [wrappedToken, idendity, twoAuth]
// }

// func().then(addresses => setAddresses(addresses)).then(fetched)