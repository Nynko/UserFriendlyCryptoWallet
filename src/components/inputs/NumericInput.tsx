import {StyleSheet} from 'react-native';
import {Input, View, XStack, type InputProps} from 'tamagui';

// More about dismissing the keyboard : https://medium.com/revelry-labs/how-to-dismiss-the-numerical-keypad-in-react-native-c7dd7a9be461
// Other Idea: https://blog.logrocket.com/building-react-native-number-pad/
export function NumericInput({
  value,
  setValue,
  placeholder,
  rightComponent,
  ...rest
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  rightComponent?: React.ReactNode;
  placeholder?: string;
} & InputProps) {
  const inputStyle = rest.style || {};
  return (
    <>
      <XStack>
        <View style={{position: 'relative', flex: 1, alignItems: 'center'}}>
          <Input
            {...rest}
            onChangeText={text =>
              setValue(formatNumber(replaceCommaByDot(text)))
            }
            value={value}
            placeholder={placeholder || '0.00'}
            keyboardType="numeric"
          />
          <View
            style={[
              styles.overlay,
              {right: -(inputStyle as any).width / 8 || undefined},
            ]}>
            {rightComponent}
          </View>
        </View>
      </XStack>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

function replaceCommaByDot(text: string): string {
  return text.replace(/,/g, '.');
}

function formatNumber(text: string): string {
  if (text === '') {
    return '';
  }

  // Remove any non-numeric characters except for the decimal point
  let formattedText = text.replace(/[^0-9.]/g, '');

  // Remove leading zeros
  formattedText = formattedText.replace(/^0+(?=\d)/, '');

  return formattedText;
}
