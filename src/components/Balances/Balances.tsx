import {Dispatch, SetStateAction, useState} from 'react';
import {WrapperBalances} from '../../components/Balances/WrapperBalances';
import {mapToViewModel} from '../../functions/accounts/mapViewModels';
import {useDltAccounts} from '../../store/selectors';
import {YStack, XStack, Button, Text} from 'tamagui';
import {SelectedMint} from '../../functions/dlts/SelectedMint';
let counter = 0;

export function Balances({
  selectedMint,
  setSelectedMint,
}: {
  selectedMint: SelectedMint;
  setSelectedMint: Dispatch<SetStateAction<SelectedMint>>;
}) {
  const dltAccounts = useDltAccounts();
  const wrapperViewModels = mapToViewModel(dltAccounts);
  const [selectedWrapper, setSelectedWrapper] = useState<string | null>(
    Object.keys(wrapperViewModels)[0],
  );

  counter++;
  console.log('Balances Counter', counter);

  const handleSelectWrapper = (wrapperAddress: string) => {
    setSelectedWrapper(wrapperAddress);
  };

  console.log('Rendering Balances component');
  return (
    <YStack>
      <XStack overflow="scroll" padding="$2" gap="$2">
        {Object.keys(wrapperViewModels).map(wrapperAddress => (
          <Button
            key={wrapperAddress}
            onPress={() => handleSelectWrapper(wrapperAddress)}
            backgroundColor={
              selectedWrapper === wrapperAddress ? '$blue10' : '$gray4'
            }>
            <Text>{wrapperViewModels[wrapperAddress].wrapperName}</Text>
          </Button>
        ))}
      </XStack>
      <XStack overflow="scroll" padding="$2" gap="$2">
        {selectedWrapper && (
          <WrapperBalances
            key={selectedWrapper}
            wrapperViewModel={wrapperViewModels[selectedWrapper]}
            wrapperAddress={selectedWrapper}
            selectedMint={selectedMint}
            setSelectedMint={setSelectedMint}
          />
        )}
      </XStack>
    </YStack>
  );
}
