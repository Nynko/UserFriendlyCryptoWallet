import {Text, View} from 'react-native';
import {mainStyle} from '../../../styles/style';
import {WrapperViewModel} from '../../types/viewModels';
import {typography} from '../../../styles/typography';
import {useBalances} from '../../hooks/contexts/useBalances';
import {DLT} from '../../types/account';
import {TokenBalance} from './TokenBalances';

export const WrapperBalances = ({
  wrapperViewModel,
}: {
  wrapperViewModel: WrapperViewModel;
}) => {
  const wrapperAddress =
    wrapperViewModel.dltAccounts[0].wrapperAddress.wrapper.toBase58();

  const balances = useBalances(DLT.SOLANA);

  console.log(balances);

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
                </View>
              ),
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
