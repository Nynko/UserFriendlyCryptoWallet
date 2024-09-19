import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Langues} from './screens/Langues';
import {Idendification} from './screens/Idendification';
import {AccountCreation} from './screens/AccountCreation';
import {Pseudo} from './screens/Pseudo';
import {WelcomeScreen} from './screens/WelcomeScreen';
import onBoardingBackground from './assets/Background/Background.png';
import {ImageBackground, StyleSheet} from 'react-native';
import {onboardingStyle} from './OnboardingStyle';

// Define types for navigation and route: https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
  Welcome: undefined;
  Langues: undefined;
  Idendification: undefined;
  AccountCreation: {identification: IdentificationFormData};
  Pseudo: {identification: IdentificationFormData};
  Review: {identification: IdentificationFormData};
};

export interface IdentificationFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  pseudo: string;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export function OnboardingMain(): React.JSX.Element {
  return (
    <>
      <ImageBackground
        source={onBoardingBackground}
        style={[onboardingStyle.container, StyleSheet.absoluteFill]}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: 'transparent'},
            animation: 'none',
          }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Langues" component={Langues} />
          <Stack.Screen name="Idendification" component={Idendification} />
          <Stack.Screen name="AccountCreation" component={AccountCreation} />
          <Stack.Screen name="Pseudo" component={Pseudo} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
