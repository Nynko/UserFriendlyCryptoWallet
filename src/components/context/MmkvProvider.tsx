import {useMemo, type FC, type ReactNode} from 'react';

import {MMKV} from 'react-native-mmkv';
import {MmkvContext} from '../../hooks/contexts/useMmkv';

export const MmkvProvider: FC<{
  children: ReactNode;
}> = ({children}) => {
  const storage = useMemo(() => new MMKV(), []);
  return (
    <MmkvContext.Provider value={{storage}}>{children}</MmkvContext.Provider>
  );
};
