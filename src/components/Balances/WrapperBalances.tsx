import {Text, View} from 'react-native';
import {mainStyle} from '../../../styles/style';
import {WrapperViewModel} from '../../types/viewModels';
import {typography} from '../../../styles/typography';

export const WrapperBalances = ({
  wrapperViewModel,
}: {
  wrapperViewModel: WrapperViewModel;
}) => {
  console.log(wrapperViewModel.dltAccounts[0].wrapperAddress);

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
                </View>
              ),
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
