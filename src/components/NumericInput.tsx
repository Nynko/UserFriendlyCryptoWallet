import { useState } from "react";
import { Button, Keyboard, SafeAreaView, TextInput } from "react-native";




// More about dismissing the keyboard : https://medium.com/revelry-labs/how-to-dismiss-the-numerical-keypad-in-react-native-c7dd7a9be461
// Other Idea: https://blog.logrocket.com/building-react-native-number-pad/
export function NumericInput({value, setValue}:{value: string, setValue: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <SafeAreaView>
            <TextInput 
                onChangeText={setValue}
                value={value}
                placeholder="0.00"
                keyboardType="numeric"
            />
            <Button title="Exit" onPress={Keyboard.dismiss}/>
        </SafeAreaView>
    )
}