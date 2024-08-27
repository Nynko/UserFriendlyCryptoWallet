import {DltAccount, WrapperAddress} from '../../types/account';
import {WrapperViewModel} from '../../types/viewModels';

export function mapToViewModel(
  dltAccounts: DltAccount[],
): Record<string, WrapperViewModel> {
  const wrapperMap: Record<string, WrapperViewModel> = {};

  for (const dltAccount of dltAccounts) {
    for (const wrapperKey in dltAccount.wrapperAddresses) {
      const wrapper = dltAccount.wrapperAddresses[wrapperKey];

      if (!wrapperMap[wrapper.wrapperName]) {
        wrapperMap[wrapper.wrapperName] = {
          wrapperName: wrapper.wrapperName,
          dltAccounts: [],
        };
      }

      wrapperMap[wrapper.wrapperName].dltAccounts.push({
        dltName: dltAccount.dltName,
        generalAddresses: dltAccount.generalAddresses,
        wrapperAddress: wrapper as WrapperAddress,
      });
    }
  }

  return wrapperMap;
}
