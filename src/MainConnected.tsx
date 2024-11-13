import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/Home';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Settings} from './screens/Settings';
import {Transactions} from './screens/Transactions';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import backgroungImage from './assets/Background/Background.png';
import {styles2} from './screens/Style';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  ArrowLeftRight as TransactionsIcon,
} from '@tamagui/lucide-icons';

const Tab = createMaterialTopTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    border: 'transparent',
    primary: 'transparent',
  },
};

const {width: screenWidth} = Dimensions.get('window');

function MainConnected(): React.JSX.Element {
  return (
    <>
      <ImageBackground
        source={backgroungImage}
        style={[styles2.container, StyleSheet.absoluteFill]}
      />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarPosition="bottom"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              shadowColor: 'transparent',
            },
            tabBarLabelStyle: {
              width: screenWidth / 3, // Adjust the width as needed
              fontSize: 25 * screenWidth * 0.001,
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarPressColor: 'transparent',
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => <SettingsIcon color={color} />,
            }}
            name="Settings"
            component={Settings}
          />
          <Tab.Screen
            options={{tabBarIcon: ({color}) => <HomeIcon color={color} />}}
            name="Home"
            component={Home}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color}) => <TransactionsIcon color={color} />,
            }}
            name="Transactions"
            component={Transactions}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainConnected;
