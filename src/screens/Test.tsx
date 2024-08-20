import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {TestConnection} from '../components/TestConnection';
import {TestGenerateKey} from '../components/TestGenerateKey';
import {TestAccessKey} from '../components/TestAccessKey';
import {TestCreateAccount} from '../components/TestCreateAccount';
import {TestAccessAccount} from '../components/TestAccessAccount';
import {TestBalance} from '../components/TestBalance';
import {Airdrop} from '../components/Airdrop';
import {TestTransfer} from '../components/TestTransfer';
import { TestCreateAnonCreds } from '../components/TestCreateAnonCreds';


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

export function Test({reloadBalances}: {reloadBalances: () => void}) {
  const isDarkMode = useColorScheme() === 'dark';

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
          <TestGenerateKey />
          <TestAccessKey />
          <TestConnection />
          <TestCreateAccount />
          <TestAccessAccount />
          <TestBalance />
          <Airdrop reloadBalances={reloadBalances}/>
          <TestTransfer reloadBalances={reloadBalances} />
          <TestCreateAnonCreds/>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change
            this screen and then come back to see your edits.
          </Section>
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: isDarkMode ? Colors.light : Colors.dark,
                },
              ]}>
              test
            </Text>
          </View>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
        </View>
      </ScrollView>
      </>)
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