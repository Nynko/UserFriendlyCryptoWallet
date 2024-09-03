import {Text, View} from 'react-native';
import {mainStyle} from '../../../styles/style';
import {WrapperViewModel} from '../../types/viewModels';
import {typography} from '../../../styles/typography';
import {TokenBalance} from './TokenBalances';
import {TransactionHistory} from './TransactionHistory';

export const WrapperBalances = ({
  wrapperViewModel,
  wrapperAddress,
}: {
  wrapperViewModel: WrapperViewModel;
  wrapperAddress: string;
}) => {
  return (
    <View style={mainStyle.container}>
      {wrapperViewModel.dltAccounts.map(viewDltAccount => (
        <View style={mainStyle.innerContainer} key={viewDltAccount.dltName}>
          <Text style={typography.subtitleText}>{viewDltAccount.dltName}</Text>
          <View style={mainStyle.innerContainer}>
            {Object.entries(viewDltAccount.wrapperAddress.mints).map(
              ([mintAddress, mint]) => (
                <View style={mainStyle.innerContainer} key={mintAddress}>
                  <Text>{mint.name}</Text>
                  <TokenBalance
                    wrapperAddress={wrapperAddress}
                    mintAddress={mintAddress}
                    dlt={viewDltAccount.dltName}
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
