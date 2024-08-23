import React from 'react';
import {Text, View} from 'react-native';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Test} from './screens/Test';
import {Home} from './screens/Home';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useUpdateBalances} from './hooks/useUpdateBalances';
import NewModuleButton from './components/ios/NewModuleButton';

const Tab = createMaterialTopTabNavigator();

function DetailsScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      <Text>Details Screen</Text>
      <NewModuleButton />
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

function MainConnected({reload}: {reload: () => void}): React.JSX.Element {
  const [reloadOnUpdate, updateBalances] = useUpdateBalances();
  return (
    <>
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarPosition="bottom"
          screenOptions={{
            tabBarStyle: {
              borderColor: '#88C8F4',
              backgroundColor: 'transparent',
            },
          }}>
          <Tab.Screen name="Details2" component={DetailsScreen} />
          <Tab.Screen name="Home">
            {() => (
              <Home
                isBalanceReloading={reloadOnUpdate}
                reloadBalances={updateBalances}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Details">
            {() => (
              <Test reloadBalances={updateBalances} reloadAddresses={reload} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainConnected;
