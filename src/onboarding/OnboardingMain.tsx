import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Information } from './screens/Information';
import { Idendification } from './screens/Idendification';
import { AccountCreation } from './screens/AccountCreation';

// Define types for navigation and route: https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
  Information: undefined;
  Idendification: undefined;
  AccountCreation: { identification: IdentificationFormData };
  Review: { identification: IdentificationFormData};
};

export interface IdentificationFormData {
  firstName: string;
  lastName: string;
}


const Stack = createNativeStackNavigator<RootStackParamList>();

export function OnboardingMain(): React.JSX.Element {  
    return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Information">
           <Stack.Screen name="Information" component={Information} />
           <Stack.Screen name="Idendification" component={Idendification}/>
           <Stack.Screen name="AccountCreation" component={AccountCreation} initialParams={{identification: {firstName: "", lastName:"" }}}/>
         </Stack.Navigator>
      </NavigationContainer>
    )
}