import { Text } from 'react-native'
import { material } from 'react-native-typography'


export function smallDecimals({value}:{value: number}){
    <Text style={material.display1}>{value.toFixed()}</Text>
}