import {Dimensions, Text} from 'react-native';
import {mainStyle} from '../../../styles/style';
import {WrapperViewModel} from '../../types/viewModels';
import {typography} from '../../../styles/typography';
import {TokenBalance} from './TokenBalances';
import {TransactionHistory} from '../Transactions/TransactionHistory';
import {
  Card,
  ScrollView,
  XStack,
  YGroup,
  YStack,
  View,
  Separator,
} from 'tamagui';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const WrapperBalances = ({
  wrapperViewModel,
  wrapperAddress,
}: {
  wrapperViewModel: WrapperViewModel;
  wrapperAddress: string;
}) => {
  return (
    <View style={{flex: 1}}>
      <YStack padding="$4">
        {wrapperViewModel.dltAccounts.map(viewDltAccount => (
          <View key={viewDltAccount.dltName} style={{marginBottom: 20}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$4" paddingHorizontal="$2">
                {Object.entries(viewDltAccount.wrapperAddress.mints).map(
                  ([mintAddress, mint]) => (
                    <Card
                      key={mintAddress}
                      width={screenWidth * 0.4} // 40% of screen width
                      height={screenHeight * 0.15} // 15% of screen height
                      padding="$2"
                      margin="$2"
                      backgroundColor="$gray2"
                      borderRadius="$2"
                      shadowColor="$shadowColor"
                      shadowOffset={{width: 0, height: 2}}
                      shadowOpacity={0.25}
                      shadowRadius={3.84}
                      elevation={5}>
                      <Text style={typography.subtitleText}>
                        {viewDltAccount.dltName}
                      </Text>
                      <TokenBalance
                        mintName={mint.name}
                        wrapperAddress={wrapperAddress}
                        mintAddress={mintAddress}
                        dlt={viewDltAccount.dltName}
                      />
                    </Card>
                  ),
                )}
              </XStack>
            </ScrollView>
          </View>
        ))}
        <View style={mainStyle.innerContainer}>
          <Text>Transaction History</Text>
          <Separator marginVertical="$4" />
          <ScrollView maxHeight={screenHeight * 0.4} width="90%">
            <TransactionHistory />
          </ScrollView>
        </View>
      </YStack>
    </View>
  );
};
