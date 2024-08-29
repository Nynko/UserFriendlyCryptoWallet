import React from 'react';
import {Text, View} from 'react-native';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useUpdateBalances} from './hooks/useUpdateBalances';
import NewModuleButton from './components/ios/NewModuleButton';
import {Balances} from './screens/Balances';

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

function MainConnected(): React.JSX.Element {
  // const balances = useBalances();
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
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Balances" component={Balances} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainConnected;
