import { Button, Text } from "react-native";
import { typography } from "../../../styles/typography";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../OnboardingMain";

type Props = NativeStackScreenProps<
    RootStackParamList,
    'Information'
>;

export function Information({navigation}: Props){

    const onNext = () => {
        navigation.navigate("Idendification");
    };

    return (
        <>
        <Text style={typography.thinTitle}>
            This is information
        </Text>
        <Button title="Next" onPress={onNext} />
        </>
    )
}