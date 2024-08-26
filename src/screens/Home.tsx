import {useState} from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Balances} from '../components/Balances';
import {Receive} from '../components/Receive/Receive';
import {Send} from '../components/Send/Send';
import {styles2} from './Style';
import {RefreshView} from '../components/utils/RefreshView';
import {useAccount} from '../hooks/contexts/useAccount';

let counterHome = 0;
/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Home({
  isBalanceReloading,
  reloadBalances,
}: {
  isBalanceReloading: boolean;
  reloadBalances: () => void;
}) {
  enum ActiveComponent {
    Receive,
    Send,
    None,
  }
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.None,
  );

  counterHome++;
  console.log(counterHome);

  const addresses = useAccount(); // Remove and have a global state
  const pk = addresses?.pubKey;
  console.log('pk', pk);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <RefreshView otherRefresh={[reloadBalances]}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <Balances isBalanceReloading={isBalanceReloading} />
          {activeComponent == ActiveComponent.Send && (
            <Send
              isBalanceReloading={isBalanceReloading}
              reloadBalances={reloadBalances}
            />
          )}
          {activeComponent == ActiveComponent.Receive && pk && (
            <Receive
              isBalanceReloading={isBalanceReloading}
              reloadBalances={reloadBalances}
              pk={pk}
            />
          )}
          <View style={styles2.buttonContainer}>
            {/* <TouchableOpacity style={styles2.button} onPress={async () => transfer(1, user1.publicKey, program).then(reloadBalances)}> */}
            <TouchableOpacity
              style={styles2.button}
              onPress={() => setActiveComponent(ActiveComponent.Send)}>
              <Text style={styles2.buttonText}>Envoyer</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles2.button} onPress={async () => accessAddress('PublicKey').then(async publicKey =>
                airdropToken(publicKey, program),
            ).then(reloadBalances)}> */}
            <TouchableOpacity
              style={styles2.button}
              onPress={() => setActiveComponent(ActiveComponent.Receive)}>
              <Text style={styles2.buttonText}>Recevoir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RefreshView>
    </TouchableWithoutFeedback>
  );
}
