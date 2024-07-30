import React, { useState } from "react";
import {Text, TouchableOpacity } from "react-native";
import { useBoolState } from "../../hooks/useBoolState";
import { QrCodeScanner } from "../QRCode/QrCodeScanner";
import { styles2 } from "../../screens/Style";


interface SendProps {
    isBalanceReloading: boolean; 
    reloadBalances: () => void
}

export function Send(props: SendProps) {
    const [qrScannerActivated, activateQrScanner] = useBoolState();
    const [value, setValue] = useState<string|null>(null);

    const data : [string[],string] = value ? JSON.parse(value) : null;

    return (
        <>  
            {data &&  <Text>{data}</Text>}
            <TouchableOpacity style={styles2.button} onPress={activateQrScanner}><Text style={styles2.buttonText}>Scan QR Code</Text></TouchableOpacity>
            {qrScannerActivated && <QrCodeScanner exit={activateQrScanner} setValue={setValue}/>}
            
        </>
    )
}

