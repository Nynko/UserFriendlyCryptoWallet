import {Dimensions, Text} from 'react-native';
import {WrapperViewModel} from '../../types/viewModels';
import {typography} from '../../../styles/typography';
import {TokenBalance} from './TokenBalances';
import {Card, ScrollView, XStack, YStack, View} from 'tamagui';
import {Dispatch, SetStateAction} from 'react';
import {
  isSelectedMintEquals,
  SelectedMint,
} from '../../functions/dlts/SelectedMint';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const WrapperBalances = ({
  wrapperViewModel,
  wrapperAddress,
  selectedMint,
  setSelectedMint,
}: {
  wrapperViewModel: WrapperViewModel;
  wrapperAddress: string;
  selectedMint: SelectedMint;
  setSelectedMint: Dispatch<SetStateAction<SelectedMint>>;
}) => {
  console.log('Rendering WrapperBalances component');
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
                      onPress={() => {
                        setSelectedMint({
                          dlt: viewDltAccount.dltName,
                          wrapper: wrapperAddress,
                          mint: mintAddress,
                        });
                      }}
                      width={screenWidth * 0.4} // 40% of screen width
                      height={screenHeight * 0.15} // 15% of screen height
                      padding="$2"
                      margin="$2"
                      backgroundColor={
                        isSelectedMintEquals(selectedMint, {
                          dlt: viewDltAccount.dltName,
                          wrapper: wrapperAddress,
                          mint: mintAddress,
                        })
                          ? '$gray5'
                          : '$gray2'
                      } // Change background color if selected
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
      </YStack>
    </View>
  );
};
