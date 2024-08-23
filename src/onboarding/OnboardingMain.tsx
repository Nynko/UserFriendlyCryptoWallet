import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Langues} from './screens/Langues';
import {Idendification} from './screens/Idendification';
import {AccountCreation} from './screens/AccountCreation';
import {Pseudo} from './screens/Pseudo';

// Define types for navigation and route: https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
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

export function OnboardingMain({
  reload,
}: {
  reload: () => void;
}): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Langues">
        <Stack.Screen name="Langues" component={Langues} />
        <Stack.Screen name="Idendification" component={Idendification} />
        <Stack.Screen name="AccountCreation">
          {props => <AccountCreation {...props} reload={reload} />}
        </Stack.Screen>
        <Stack.Screen name="Pseudo" component={Pseudo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
