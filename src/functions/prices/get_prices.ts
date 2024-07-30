


export function getSolanaPriceEur(){
    return 0;
}

export function SolToEur(sol: number): number{
    const price = getSolanaPriceEur();
    return price * sol;
}