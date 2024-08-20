import React, { useState } from "react";
import {Button, Text, TouchableOpacity } from "react-native";
import { useBoolState } from "../../hooks/useBoolState";
import { QrCodeScanner } from "../QRCode/QrCodeScanner";
import { styles2 } from "../../screens/Style";
import * as anchor from "@coral-xyz/anchor"
import { SendLogic } from "./SendLogic";

interface SendProps {
    isBalanceReloading: boolean; 
    reloadBalances: () => void
}

export function Send(props: SendProps) {
    const [qrScannerActivated, activateQrScanner] = useBoolState();
    const [reiceved, setReceived] = useState<string|null>(null);

    const data = reiceved ? JSON.parse(reiceved) : null;
    
    const pk = data ? new anchor.web3.PublicKey(JSON.parse(data)[0]) : null;
    const value = data ? Number(JSON.parse(data)[1]) : null;

    return (
        <>  
            {data && pk && value &&  <SendLogic pk={pk} value={value} reloadBalances={props.reloadBalances}/>}
            <TouchableOpacity style={styles2.button} onPress={activateQrScanner}><Text style={styles2.buttonText}>Scan QR Code</Text></TouchableOpacity>
            {qrScannerActivated && <QrCodeScanner exit={activateQrScanner} setValue={setReceived}/>}
        </>
    )
}

