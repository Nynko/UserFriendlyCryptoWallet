import React, { useState } from 'react';
import {
  Button,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import SolanaConnection from './components/context/SolanaConnection';
import { AnchorProgramProvider } from './components/context/SolanaAnchorProgram';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Test } from './screens/Test';
import { Home } from './screens/Home';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import backgroundImage from '../assets/background3.png';
import { TabBar } from 'react-native-tab-view';
import { useUpdateBalances } from './hooks/useUpdateBalances';
import { RefreshView } from './components/utils/RefreshView';
import NewModuleButton from './components/ios/NewModuleButton';

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
    <NewModuleButton/>
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


function Main(): React.JSX.Element {
  const [reloadOnUpdate, updateBalances] = useUpdateBalances();

  return (
    <> 
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
    </>
  )
}


export default Main;
