import {BACKEND_URL} from '@env';

interface RawTxData {
  transaction: String;
  blockhash: String;
}

export async function signTwoAuth(
  rawData: RawTxData,
): Promise<RawTxData | Error> {
  try {
    const backend_url = BACKEND_URL;
    console.log();

    const response = await fetch(`${backend_url}/two-auth-sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return error as Error;
  }
}

export async function signIssuerId(
  rawData: RawTxData,
): Promise<RawTxData | Error> {
  try {
    const backend_url = BACKEND_URL;
    console.log();

    const response = await fetch(`${backend_url}/sign-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return error as Error;
  }
}
