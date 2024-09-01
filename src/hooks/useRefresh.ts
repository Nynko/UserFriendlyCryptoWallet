import {useCallback, useState} from 'react';

// https://reactnative.dev/docs/refreshcontrol
export function useRefresh(
  otherRefresh?: (() => void)[],
  otherRefreshAsync?: (() => Promise<void>)[],
): [boolean, () => void] {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    otherRefresh?.map(func => func());
    otherRefreshAsync?.map(async func => await func());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return [refreshing, onRefresh];
}
