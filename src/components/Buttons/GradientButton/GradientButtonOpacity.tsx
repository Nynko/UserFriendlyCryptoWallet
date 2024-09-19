import {memo, useState} from 'react';
import {GradientButton, GradientButtonProps} from './GradientButton';
import {StyleSheet} from 'react-native';

export const GradientButtonOpacity = memo((props: GradientButtonProps) => {
  const [opacity, setOpacity] = useState(1);

  const buttonStyle = StyleSheet.flatten(props.buttonStyle) || {};
  const combinedButtonStyle = {
    ...buttonStyle,
    opacity,
  };

  return (
    <GradientButton
      {...props}
      buttonStyle={combinedButtonStyle}
      buttonProps={{
        ...props.buttonProps,
        onPressIn: () => setOpacity(0.6),
        onPressOut: () => setOpacity(0.8),
      }}
    />
  );
});
