import {DLT, GeneralAddresses, Wrappers} from './account';

/** This is use to show the element from a business logic:
 * We have wrappers (same approver) that will be implemented on different chains
 * They should have the same wrapper name.
 */
export interface WrapperViewModel {
  wrapperName: string;
  dltAccounts: DltAccountViewModel[];
}

export interface DltAccountViewModel {
  dltName: DLT;
  generalAddresses: GeneralAddresses;
  wrapperAddress: Wrappers;
}
