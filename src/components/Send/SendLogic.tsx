import * as  anchor from '@coral-xyz/anchor';
import { useDeriveAddresses } from '../../hooks/useDeriveAddresses';
import { MINT_PUB, WRAPPER } from '../../tmp';
import { ActivityIndicator, Button } from 'react-native';
import { transferToken } from '../../functions/transfer';
import { accessAddress, accessSolanaWallet } from '../../functions/solana_wallet';
import { HandmadeNaive } from '../../Anchor_IDL/handmade_naive';
import { useAnchorProgram } from '../../hooks/contexts/useAnchorProgram';
import { useState } from 'react';




export function SendLogic({pk,value, reloadBalances}:{pk: anchor.web3.PublicKey, value: number, reloadBalances: () => void}){

    const [loading, setLoading] = useState<boolean>(false);

    const program = useAnchorProgram().program;
    const wrapper = new anchor.web3.PublicKey(
        WRAPPER,
      );
      const mint = new anchor.web3.PublicKey(
        MINT_PUB,
      );

    console.log(pk.toBase58());
    
    const addresses = useDeriveAddresses(mint, wrapper,pk);

    const destinationWrappedAccount = addresses[0];

    async function getAndTransfer(){
        setLoading(true);
        accessSolanaWallet().then(async (signer) => {
            const wrappedAccount = await accessAddress('WrappedAccount' + mint.toString());
            console.log(wrappedAccount);
            
            const twoAuth = await accessAddress('TwoAuth' + wrappedAccount.toString());
            const TwoAuthEntity = await accessAddress('TwoAuthEntity' + wrappedAccount.toString());
            return transferToken(value,wrapper,signer,wrappedAccount,pk,destinationWrappedAccount,twoAuth,TwoAuthEntity,program)
            }).then(() => {reloadBalances(); setLoading(false)})
    }
    
    return (<>
        <Button title='Confirm'onPress={getAndTransfer} />
        {loading && <ActivityIndicator />}
    </>)
}