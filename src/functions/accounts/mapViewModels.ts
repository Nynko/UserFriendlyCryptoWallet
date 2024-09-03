import {DLT, DltAccount} from '../../types/account';
import {WrapperViewModel} from '../../types/viewModels';

export function mapToViewModel(
  dltAccounts: Record<DLT, DltAccount>,
): Record<string, WrapperViewModel> {
  const wrapperMap: Record<string, WrapperViewModel> = {};

  for (const [dlt, dltAccount] of Object.entries(dltAccounts)) {
    for (const wrapperKey in dltAccount.wrappers) {
      const wrapper = dltAccount.wrappers[wrapperKey];

      if (!wrapperMap[wrapperKey]) {
        wrapperMap[wrapperKey] = {
          wrapperName: wrapper.wrapperName,
          dltAccounts: [],
        };
      }

      wrapperMap[wrapperKey].dltAccounts.push({
        dltName: dlt as DLT,
        generalAddresses: dltAccount.generalAddresses,
        wrapperAddress: wrapper,
      });
    }
  }

  return wrapperMap;
}
