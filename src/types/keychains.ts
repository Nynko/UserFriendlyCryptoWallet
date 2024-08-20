export enum KeychainElements {
  LinkSecret = 'anoncreds_link_secret',
  AnoncredsCredential = 'AnoncredsCredential',
  PrivateKey = 'PrivateKey',
  WrappedAccountWithMint = 'WrappedAccount', // Add the mint !!
  Idendity = 'Idendity',
  TwoAuthWithWrappedAccount = 'TwoAuth', // Add the WrappedAccount address
  TwoAuthEntityWithWrappedAccount = 'TwoAuthEntity', // Add the WrappedAccount address
}
