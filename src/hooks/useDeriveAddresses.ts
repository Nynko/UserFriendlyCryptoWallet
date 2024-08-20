import { useEffect, useMemo, useState } from "react";
import * as anchor from '@coral-xyz/anchor';
import { useAnchorProgram } from "./contexts/useAnchorProgram";

export function useDeriveAddresses(mint: anchor.web3.PublicKey,wrapper: anchor.web3.PublicKey, pk: anchor.web3.PublicKey){
    const program = useAnchorProgram().program;
    const [addresses, setAddresses] = useState<anchor.web3.PublicKey[]>([])
    useEffect(()=>{
        async function deriveAddresses(){
            const [wrappedToken] = await anchor.web3.PublicKey.findProgramAddressSync(
                [
                  Buffer.from('wrapped_token'),
                  wrapper.toBuffer(),
                  mint.toBuffer(),
                  pk.toBuffer(),
                ],
                program.programId,
              );
            const [idendity] = await anchor.web3.PublicKey.findProgramAddressSync(
                [
                Buffer.from("identity"),
                pk.toBuffer()
                ],
                program.programId,
              );
            const [twoAuth] = await anchor.web3.PublicKey.findProgramAddressSync(
                [
                  Buffer.from('two_auth'),
                  wrapper.toBuffer(),
                  pk.toBuffer(),
                ],
                program.programId,
              );

            return [wrappedToken,idendity,twoAuth]
        }

        deriveAddresses().then(setAddresses)
    }, [])

    return addresses;
} 
