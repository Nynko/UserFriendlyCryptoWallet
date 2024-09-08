import {Text, View, YStack} from 'tamagui';
import {HomeBalances} from './Balances/HomeBalances';
import {styles2} from '../screens/Style';
import {TouchableOpacity} from 'react-native';
import {ActiveComponent} from '../types/components/ActiveComponent';
import {SelectedMint} from '../functions/dlts/SelectedMint';
import {Dispatch, SetStateAction} from 'react';

export function HomeMain({
  selectedMint,
  priceOfSeletedMint,
  setActiveComponent,
}: {
  selectedMint: SelectedMint;
  priceOfSeletedMint: number;
  setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
}) {
  return (
    <View>
      <HomeBalances {...selectedMint} price={priceOfSeletedMint} />
      <YStack padding="$1">
        <View style={styles2.buttonContainer}>
          <TouchableOpacity
            style={styles2.button}
            onPress={() => setActiveComponent(ActiveComponent.SendComponent)}>
            <Text style={styles2.buttonText}>Envoyer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles2.button}
            onPress={() =>
              setActiveComponent(ActiveComponent.ReceiveComponent)
            }>
            <Text style={styles2.buttonText}>Recevoir</Text>
          </TouchableOpacity>
        </View>
      </YStack>
    </View>
  );
}
