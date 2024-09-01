import {Text, View} from 'react-native';
import {mainStyle} from '../../../styles/style';
import {WrapperViewModel} from '../../types/viewModels';
import {typography} from '../../../styles/typography';
import {useBalances} from '../../hooks/contexts/useBalances';
import {DLT} from '../../types/account';
import {TokenBalance} from './TokenBalances';
import {TransactionHistory} from './TransactionHistory';

export const WrapperBalances = ({
  wrapperViewModel,
  wrapperAddress,
}: {
  wrapperViewModel: WrapperViewModel;
  wrapperAddress: string;
}) => {
  const balances = useBalances(DLT.SOLANA);

  return (
    <View style={mainStyle.container}>
      {wrapperViewModel.dltAccounts.map(viewDltAccount => (
        <View style={mainStyle.innerContainer} key={viewDltAccount.dltName}>
          <Text style={typography.subtitleText}>{viewDltAccount.dltName}</Text>
          <View style={mainStyle.innerContainer}>
            {Object.entries(viewDltAccount.wrapperAddress.mints).map(
              ([name, _mint]) => (
                <View style={mainStyle.innerContainer} key={name}>
                  <Text>{name}</Text>
                  <TokenBalance
                    balance={balances.wrappers[wrapperAddress].EURC.balance}
                  />
                  <TransactionHistory />
                </View>
              ),
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
