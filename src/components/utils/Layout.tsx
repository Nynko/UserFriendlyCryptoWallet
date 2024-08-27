import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {mainStyle} from '../../../styles/style';
import {RefreshView, RefreshViewProps} from './RefreshView';

export function Layout(props: RefreshViewProps) {
  return (
    <SafeAreaView style={mainStyle.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <RefreshView {...props} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
