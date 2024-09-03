import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HomeBalances} from '../components/Balances/HomeBalances';
import {Receive} from '../components/Receive/Receive';
import {Send} from '../components/Send/Send';
import {styles2} from './Style';
import {Layout} from '../components/utils/Layout';
import {mainStyle} from '../../styles/style';
import {appStore} from '../store/zustandStore';
import {DLT} from '../types/account';
import {reloadAllBalancesSolana} from '../store/actions';
import {useAnchorProgram} from '../hooks/contexts/useAnchorProgram';

let counterHome = 0;
/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Home() {
  enum ActiveComponent {
    Receive,
    Send,
    None,
  }
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.None,
  );

  counterHome++;
  console.log('counterHome', counterHome);

  const program = useAnchorProgram().program;
  const reloadBalances = () => reloadAllBalancesSolana(program);

  const pk = appStore(state => state.dlts[DLT.SOLANA].generalAddresses.pubKey);
  console.log('pk', pk);

  return (
    <Layout otherRefreshAsync={[reloadBalances]}>
      <View style={mainStyle.container}>
        <HomeBalances />
        {activeComponent === ActiveComponent.Send && <Send />}
        {activeComponent === ActiveComponent.Receive && pk && (
          <Receive pk={pk} />
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
    </Layout>
  );
}
