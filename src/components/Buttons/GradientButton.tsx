import {memo, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {GradientContoursComponent} from '../GradientContoursComponent';
import {Button, ButtonProps} from 'tamagui';

export const GradientButton = memo(
  ({onPress, children}: {onPress: () => void; children: React.ReactNode}) => {
    const [opacity, setOpacity] = useState(1);

    const buttonStyle = StyleSheet.flatten(styles.button) || {};
    const combinedButtonStyle = {
      ...buttonStyle,
      opacity,
    };

    return (
      <GradientContoursComponent
        children={children}
        borderWidth={borderWidth}
        linearGradientProps={{
          colors: ['#FFFAFA', '#00C0D9'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
          style: styles.gradientBorder,
        }}
        Component={Button}
        componentStyle={combinedButtonStyle}
        componentProps={
          {
            onPress: onPress,
            onPressIn: () => setOpacity(0.6),
            onPressOut: () => setOpacity(0.8),
          } as ButtonProps
        }
      />
    );
  },
);

const {width} = Dimensions.get('window');
const borderWidth = 1;
const borderRadius = 27;
const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: borderRadius,
    opacity: 0.6,
  },
  button: {
    borderRadius: borderRadius,
    backgroundColor: 'rgba(18, 17, 17, 0.4)',
    borderWidth: 0,
    width: width * 0.5,
  },
});
