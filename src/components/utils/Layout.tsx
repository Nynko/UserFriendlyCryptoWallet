import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {mainStyle} from '../../../styles/style';
import {ReactNode} from 'react';

export function Layout({children}: {children: ReactNode}) {
  return (
    <SafeAreaView style={mainStyle.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
