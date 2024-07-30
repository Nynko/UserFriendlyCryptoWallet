import { useState } from "react";



export function useBoolState(init?: boolean): [boolean, ()=> void]{
    const [boolValue, setBoolValue] = useState<boolean>(init || false);

    return [boolValue, ()  => {setBoolValue((oldValue) => !oldValue)}]
}

export function useBoolStateOnce(): [boolean, () => void]{
    const [boolValue, setBoolValue] = useState<boolean>(false);

    return [boolValue, ()  => {setBoolValue(true)}]
}