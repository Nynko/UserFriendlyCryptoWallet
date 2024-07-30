import React, { useState } from 'react';
import {
  Button,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import './src/utils/polyfill';
import SolanaConnection from './src/components/SolanaConnection';
import { AnchorProgramProvider } from './src/components/SolanaAnchorProgram';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Test } from './src/screens/Test';
import { Home } from './src/screens/Home';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import backgroundImage from './assets/background3.png';
import { TabBar } from 'react-native-tab-view';
import { useUpdateBalances } from './src/hooks/useUpdateBalances';

const Tab = createMaterialTopTabNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"transparent" }}>
    <Text>Details Screen</Text>
    </View>
  );
}
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};


function App(): React.JSX.Element {
  const [reloadOnUpdate, updateBalances] = useUpdateBalances();

  return (
    <>
      <ImageBackground source={backgroundImage} style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "transparent"
      }}>
        <SolanaConnection>
          <AnchorProgramProvider>
            <NavigationContainer theme={navTheme}>
              <Tab.Navigator initialRouteName="Home" tabBarPosition="bottom"
                screenOptions={{
                  tabBarStyle: { borderColor: "#88C8F4", backgroundColor: 'transparent' },
                }}>
                <Tab.Screen name="Details2" component={DetailsScreen} />
                <Tab.Screen name="Home"> 
                  {() => <Home isBalanceReloading={reloadOnUpdate} reloadBalances={updateBalances} />}
                </Tab.Screen>
                <Tab.Screen name="Details">
                  {() => <Test reloadBalances={updateBalances} /> }
                  </Tab.Screen>
              </Tab.Navigator>
            </NavigationContainer>
          </AnchorProgramProvider>
        </SolanaConnection>
      </ImageBackground>
    </>
  )
}


export default App;
