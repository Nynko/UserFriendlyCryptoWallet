import {EURC_MINT} from '../../const';
import {DLT} from '../../types/account';

const cache: {[mint: string]: {price: number; timestamp: number}} = {};
const CACHE_DURATION = 12 * 1000; // 12 seconds in milliseconds

export async function fetchSolanaTokensPrice(mint: string): Promise<number> {
  const now = Date.now();

  // Check if the price is in the cache and is still valid
  if (cache[mint] && now - cache[mint].timestamp < CACHE_DURATION) {
    return cache[mint].price;
  }

  // Fetch the price from the API
  const price = await fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${mint}&vs_currencies=eur&precision=full`,
  )
    .then(response => response.json())
    .then(data => {
      if (data.error_code === 429) {
        return cache[mint].price;
      }
      return data[mint].eur;
    });

  // Update the cache
  cache[mint] = {price, timestamp: now};

  return price;
}

export async function getPriceEur(dlt: DLT, mint: string) {
  switch (dlt) {
    case DLT.SOLANA:
      if (mint === EURC_MINT) {
        return 1;
      }
      return fetchSolanaTokensPrice(mint);
  }
}
