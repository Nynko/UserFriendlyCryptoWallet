declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '@env' {
  export const ENV: string;
  export const BACKEND_URL: string;
  export const BACKEND_ID_URL: string;
  export const SOLANA_ENDPOINT: string;
  export const SOLANA_WS_ENDPOINT: string;
}
