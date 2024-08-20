import { Button, Text, TextInput, View } from "react-native";
import { typography } from "../../../styles/typography";

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IdentificationFormData, RootStackParamList } from "../OnboardingMain";


type PersonalInfoScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'Idendification'
>;


export function Idendification({ navigation }: PersonalInfoScreenProps) {
    const { control, handleSubmit, getValues } = useForm<IdentificationFormData>();

    const onNext: SubmitHandler<IdentificationFormData> = () => {
        const data = getValues();
        console.log(data);
        navigation.navigate('AccountCreation', { identification: data });
    };

    return (
        <>
            <Text style={typography.thinTitle}>
                This is Idendification
            </Text>
            <View>
                <Text>First Name</Text>
                <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, value } }) => (
                        <TextInput onChangeText={onChange} value={value} />
                    )}
                />
                <Text>Last Name</Text>
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, value } }) => (
                        <TextInput onChangeText={onChange} value={value} />
                    )}
                />
                <Button title="Next" onPress={handleSubmit(onNext)} />
            </View>
        </>
    )
}