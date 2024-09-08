import {ScrollView, Text, View} from 'tamagui';
import {YStack} from 'tamagui';
import {typography} from '../../styles/typography';
import {TransactionHistory} from '../components/Transactions/TransactionHistory';
import {Dimensions} from 'react-native';

const {height: screenHeight} = Dimensions.get('window');

export function Transactions() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
      <View width="100%">
        <Text
          style={[typography.titleText, {textAlign: 'center'}]}
          marginBottom="$5">
          Transaction History
        </Text>
        <ScrollView
          maxHeight={screenHeight * 0.4}
          width="90%"
          alignSelf="center">
          <TransactionHistory />
        </ScrollView>
      </View>
    </YStack>
  );
}
