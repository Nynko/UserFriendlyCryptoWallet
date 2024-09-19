import {memo} from 'react';
import {GradientButtonOpacity} from '../GradientButton/GradientButtonOpacity';
import {Dimensions, StyleSheet} from 'react-native';

export const GradientButtonStyled = memo(
  ({onPress, children}: {onPress: () => void; children: React.ReactNode}) => {
    return (
      <GradientButtonOpacity
        children={children}
        borderWidth={borderWidth}
        linearGradientProps={{
          colors: ['#FFFAFA', '#00C0D9'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
          style: styles.gradientBorder,
        }}
        buttonStyle={styles.button}
        buttonProps={{onPress: onPress}}
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
  },
  button: {
    borderRadius: borderRadius,
    backgroundColor: 'rgba(18, 17, 17, 0.4)',
    borderWidth: 0,
    width: width * 0.5,
  },
});
