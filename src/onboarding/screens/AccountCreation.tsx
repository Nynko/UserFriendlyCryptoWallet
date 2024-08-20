
import { Button, Text, TextInput, View } from "react-native";
import { typography } from "../../../styles/typography";

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IdentificationFormData, RootStackParamList } from "../OnboardingMain";
import { create_anoncreds } from "../functions/create_anoncreds";
import { useAnchorProgram } from "../../hooks/contexts/useAnchorProgram";
import { accessCredential } from "../../functions/accessAnoncreds";

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AccountCreation'
>;

type PersonalInfoScreenRouteProp = RouteProp<
    RootStackParamList,
    'AccountCreation'
>;

interface PersonalInfoScreenProps {
    navigation: PersonalInfoScreenNavigationProp;
    route: PersonalInfoScreenRouteProp;
}


export function AccountCreation({ navigation, route }: PersonalInfoScreenProps) {
    const program = useAnchorProgram().anoncredsProgram;
    const { control, handleSubmit, getValues } = useForm<IdentificationFormData>();
    const {identification} = route.params;

    const onClick = async () => {
        await create_anoncreds({"name": identification.firstName + " " + identification.lastName, "age": "18", "sex": "male", "height":"170"},program);

    }


    return (
        <>
            <Text style={typography.thinTitle}>
                This is Creation of anoncreds 
            </Text>
            <View>
                <Button title="Next" onPress={onClick} />
            </View>
        </>
    )
}