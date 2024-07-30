import React, { useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Balances } from '../components/Balances'
import { useAnchorProgram } from "../hooks/contexts/useAnchorProgram";
import { USER_KEY } from "../tmp";
import * as anchor from '@coral-xyz/anchor';
import { transfer } from "../components/TestTransfer";
import { airdropToken } from "../functions/tmp_airdrop";
import { accessAddress } from "../functions/solana_wallet";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Receive } from "../components/Receive/Receive";
import { Send } from "../components/Send/Send";
import { useGetPk } from "../hooks/useGetPk";
import { styles2 } from "./Style";

/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Home({ isBalanceReloading, reloadBalances }: { isBalanceReloading: boolean, reloadBalances: () => void }) {
    enum ActiveComponent {
        Receive,
        Send,
        None
    }
    const [activeComponent, setActiveComponent] = useState<ActiveComponent>(ActiveComponent.None)
    const program = useAnchorProgram().program;
    const user1_pk = new Uint8Array(USER_KEY);
    const user1 = anchor.web3.Keypair.fromSecretKey(user1_pk);

    const pk = useGetPk();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "transparent" }}>
                <Balances isBalanceReloading={isBalanceReloading} />
                {activeComponent == ActiveComponent.Send && <Send isBalanceReloading={isBalanceReloading} reloadBalances={reloadBalances} />}
                {activeComponent == ActiveComponent.Receive && pk && <Receive isBalanceReloading={isBalanceReloading} reloadBalances={reloadBalances} pk={pk} />}
                <View style={styles2.buttonContainer}>
                    {/* <TouchableOpacity style={styles2.button} onPress={async () => transfer(1, user1.publicKey, program).then(reloadBalances)}> */}
                    <TouchableOpacity style={styles2.button} onPress={() => setActiveComponent(ActiveComponent.Send)}>
                        <Text style={styles2.buttonText}>Envoyer</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles2.button} onPress={async () => accessAddress('PublicKey').then(async publicKey =>
                airdropToken(publicKey, program),
            ).then(reloadBalances)}> */}
                    <TouchableOpacity style={styles2.button} onPress={() => setActiveComponent(ActiveComponent.Receive)}>
                        <Text style={styles2.buttonText}>Recevoir</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}

