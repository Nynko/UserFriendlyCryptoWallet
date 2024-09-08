import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Settings} from './screens/Settings';
import {Transactions} from './screens/Transactions';
import {Dimensions} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const {width: screenWidth} = Dimensions.get('window');

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
            tabBarLabelStyle: {
              width: screenWidth / 3, // Adjust the width as needed
            },
          }}>
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Transactions" component={Transactions} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainConnected;
