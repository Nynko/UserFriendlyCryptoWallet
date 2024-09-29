import MaskedView from '@react-native-masked-view/masked-view';
import React, {CSSProperties, memo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {View} from 'tamagui';

// Defined in tamagui/web/src
type LooseCombinedObjects<A extends Object, B extends Object> = A | B | (A & B);

type WithStyleProp = {
  style: StyleProp<LooseCombinedObjects<CSSProperties, ViewStyle>>;
  children?: React.ReactNode;
};

export interface GradientContoursComponentProps<P extends WithStyleProp> {
  viewStyle?: StyleProp<LooseCombinedObjects<CSSProperties, ViewStyle>>;
  componentStyle?: StyleProp<LooseCombinedObjects<CSSProperties, ViewStyle>>;
  children?: React.ReactNode;
  borderWidth: number;
  linearGradientProps: LinearGradientProps;
  Component: React.ComponentType<P>;
  componentProps?: Omit<P, 'style'>;
}

export const GradientContoursComponent = memo(
  <P extends WithStyleProp>({
    viewStyle,
    componentStyle,
    children,
    borderWidth,
    linearGradientProps,
    Component,
    componentProps,
  }: GradientContoursComponentProps<P>) => {
    const combinedStyle = [
      componentStyle,
      {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderWidth: borderWidth,
      },
    ];

    return (
      <View style={viewStyle}>
        <View style={[StyleSheet.absoluteFill, {zIndex: 1}]}>
          <MaskedView
            maskElement={
              <Component {...(componentProps as P)} style={combinedStyle} />
            }>
            <LinearGradient {...linearGradientProps}>
              <Component {...(componentProps as P)} style={componentStyle} />
            </LinearGradient>
          </MaskedView>
        </View>
        <View>
          <Component {...(componentProps as P)} style={componentStyle}>
            {children}
          </Component>
        </View>
      </View>
    );
  },
);
