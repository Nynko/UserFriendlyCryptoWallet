import {Button, SafeAreaView, View} from 'react-native';
import NewModuleButton from '../components/ios/NewModuleButton';
import {mainStyle} from '../../styles/style';
import {appStore} from '../store/zustandStore';
import NFC from '../components/TestNFC';

/* isBalanceReloading balances has no semantic, it will switch from true to false and opposite just to reload the balances 
as a side effect*/
export function Settings() {
  return (
    <SafeAreaView style={mainStyle.safeArea}>
      <NewModuleButton />
      <Button
        title="Delete Account"
        onPress={() => {
          const init = appStore.getInitialState();
          appStore.setState(init);
        }}
      />
      <View style={mainStyle.container}>
        <NFC />
      </View>
    </SafeAreaView>
  );
}
