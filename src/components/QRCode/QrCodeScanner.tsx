import React, { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { useBoolState } from "../../hooks/useBoolState";


export function QrCodeScanner( {exit, setValue}: {exit: () => void, setValue: React.Dispatch<React.SetStateAction<string | null>>}){
    const { hasPermission, requestPermission } = useCameraPermission()
    const [_reloaded, reload] = useBoolState(false);
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
          setValue(codes[0].value || "")
          exit()
        }
      })

      const device = useCameraDevice('back')
      
      
    if(!hasPermission){
        return (<>
                    <Text> You need to activate the camera</Text>
                    <Button title="Request Activation" onPress={() => requestPermission().then(reload)}/>
                </>
        )
    }
    if (device == null) return (<><Text> No camera was detected </Text> </>)
    return (<>
       <Camera  style={StyleSheet.absoluteFill} device={device} codeScanner={codeScanner} isActive={true} />
    </>)
}