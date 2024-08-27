import {ReactNode} from 'react';
import {useRefresh} from '../../hooks/useRefresh';
import {RefreshControl, ScrollView} from 'react-native';
import {mainStyle} from '../../../styles/style';

export interface RefreshViewProps {
  children: ReactNode;
  otherRefresh?: (() => void)[] | undefined;
}

export function RefreshView({children, otherRefresh}: RefreshViewProps) {
  const [refreshing, onRefresh] = useRefresh(otherRefresh);

  return (
    <ScrollView
      contentContainerStyle={mainStyle.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {children}
    </ScrollView>
  );
}
