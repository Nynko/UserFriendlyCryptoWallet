import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {TestConnection} from '../components/TestConnection';
import {Airdrop} from '../components/Airdrop';
import {TestTransfer} from '../components/TestTransfer';
import {KeychainElements} from '../types/keychains';
import {deleteKeychain} from '../functions/wallet/solana_wallet';
import NFC from '../components/TestNFC';
import {useAccount} from '../hooks/contexts/useAccount';
import {saveState} from '../functions/accounts/mmkv-utils';
import {DLT} from '../types/account';
import {useMMKV} from 'react-native-mmkv';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export function Test({
  reloadBalances,
  reloadAccounts,
}: {
  reloadBalances: () => void;
  reloadAccounts: () => void;
}) {
  const isDarkMode = useColorScheme() === 'dark';
  const addresses = useAccount();
  const mmkv = useMMKV();

  console.log(addresses);
  const uiManager = global?.nativeFabricUIManager ? 'Fabric' : 'Paper';

  console.log(`Using ${uiManager}`);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title="Delete Account"
            onPress={() => {
              mmkv.delete(DLT.SOLANA);
              reloadAccounts();
            }}
          />
          <View style={styles.sectionContainer}>
            <NFC />
          </View>
          <TestConnection />
          <Airdrop reloadBalances={reloadBalances} />
          <TestTransfer reloadBalances={reloadBalances} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
