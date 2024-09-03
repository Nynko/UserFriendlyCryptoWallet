import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Balances} from './screens/Balances';
import {Settings} from './screens/Settings';

const Tab = createMaterialTopTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

function MainConnected(): React.JSX.Element {
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
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Balances" component={Balances} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainConnected;
