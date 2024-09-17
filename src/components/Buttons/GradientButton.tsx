import MaskedView from '@react-native-masked-view/masked-view';
import React, {CSSProperties, memo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {Button, View} from 'tamagui';

// Defined in tamagui/web/src
type LooseCombinedObjects<A extends Object, B extends Object> = A | B | (A & B);

export interface GradientButtonProps {
  viewStyle?: StyleProp<LooseCombinedObjects<CSSProperties, ViewStyle>>;
  buttonStyle?: StyleProp<LooseCombinedObjects<CSSProperties, ViewStyle>>;
  children?: React.ReactNode;
  borderWidth: number;
  linearGradientProps: LinearGradientProps;
}

export const GradientButton = memo(
  ({
    viewStyle,
    buttonStyle,
    children,
    borderWidth,
    linearGradientProps,
  }: GradientButtonProps) => {
    return (
      <View style={viewStyle}>
        <View style={[StyleSheet.absoluteFill, {zIndex: 1}]}>
          <MaskedView
            maskElement={
              <Button
                style={[
                  buttonStyle,
                  {
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderColor: '#ffffff',
                    borderWidth: borderWidth,
                  },
                ]}
              />
            }>
            <LinearGradient {...linearGradientProps}>
              <Button style={[buttonStyle]} />
            </LinearGradient>
          </MaskedView>
        </View>
        <View>
          <Button style={[buttonStyle]}>{children}</Button>
        </View>
      </View>
    );
  },
);
