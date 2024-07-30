import { useEffect, useState } from "react";
import * as anchor from '@coral-xyz/anchor'
import { accessAddress } from "../functions/solana_wallet";


export function useGetPk(){
    const [pk,setPk] = useState<anchor.web3.PublicKey|null>(null);

    useEffect(()=>{
        accessAddress("PublicKey").then(setPk);
    }, [])

    return pk;;
}