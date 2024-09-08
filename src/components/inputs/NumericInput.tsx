import {Input} from 'tamagui';

// More about dismissing the keyboard : https://medium.com/revelry-labs/how-to-dismiss-the-numerical-keypad-in-react-native-c7dd7a9be461
// Other Idea: https://blog.logrocket.com/building-react-native-number-pad/
export function NumericInput({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}) {
  return (
    <>
      <Input
        onChangeText={text => setValue(replaceCommaByDot(text))}
        value={value}
        placeholder={placeholder || '0.00'}
        keyboardType="numeric"
      />
    </>
  );
}

function replaceCommaByDot(text: string): string {
  return text.replace(/,/g, '.');
}
