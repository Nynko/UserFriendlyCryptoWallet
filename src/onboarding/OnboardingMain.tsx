import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Information} from './screens/Information';
import {Idendification} from './screens/Idendification';
import {AccountCreation} from './screens/AccountCreation';
import {Pseudo} from './screens/Pseudo';

// Define types for navigation and route: https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
  Information: undefined;
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
  const initialParams = {
    identification: {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(Date.now()),
      pseudo: '',
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Information">
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="Idendification" component={Idendification} />
        <Stack.Screen
          name="AccountCreation"
          component={AccountCreation}
          initialParams={initialParams}
        />
        <Stack.Screen name="Pseudo" component={Pseudo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
