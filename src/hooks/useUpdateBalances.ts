import { useState } from "react";


export function useUpdateBalances() : [boolean, () => void]{
    const [reloadOnUpdate, setUpdateBalance] = useState<boolean>(false);
    const updateBalances = () => setUpdateBalance((prev) => !prev);
    return [reloadOnUpdate,updateBalances];
}