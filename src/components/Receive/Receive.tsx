import { Button, Text } from "react-native";
import { accessAddress } from "../../functions/solana_wallet";
import * as anchor from '@coral-xyz/anchor'
import { NumericInput } from "../NumericInput";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useBoolState, useBoolStateOnce } from "../../hooks/useBoolState";
import { MINT_PUB, WRAPPER } from "../../tmp";

export function Receive({ isBalanceReloading, reloadBalances, pk }: { isBalanceReloading: boolean, reloadBalances: () => void, pk: anchor.web3.PublicKey }){
    const [value, setValue] = useState<string>('')
    const [qr, setQr] = useBoolState(false)

    const [addresses, setAddresses] = useState<anchor.web3.PublicKey[]>([]);
    const [fetchedAddr, fetched] = useBoolStateOnce();

    useEffect(()=> {

        async function func(){

            const wrapper = new anchor.web3.PublicKey(
                WRAPPER,
              );
              const mint = new anchor.web3.PublicKey(
                MINT_PUB,
              );
            let wrappedToken = await accessAddress('WrappedAccount' + mint.toString());
            let idendity = await accessAddress('Idendity');
            let twoAuth = await accessAddress('TwoAuth' + wrappedToken.toString());

            return [wrappedToken, idendity, twoAuth]
        }
        console.log("fetchingbIS");
        
        func().then(addresses => setAddresses(addresses)).then(fetched)

    },[fetchedAddr])

      
    const data = JSON.stringify([addresses,value])

    return (<>
        <NumericInput value={value} setValue={setValue}/>
        <Text>Receive to: {pk.toString()} </Text>
        <Button title="Receive money" onPress={setQr}/>
        {qr && <QRCode bgColor={"transparent"} size={150} value={JSON.stringify(data)} />}
    </>)
}