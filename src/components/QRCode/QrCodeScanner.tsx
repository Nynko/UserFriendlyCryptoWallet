import {Button, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useBoolState} from '../../hooks/useBoolState';
import styles from './QrCodeScanner.style';

export function QrCodeScanner({
  exit,
  setValue,
}: {
  exit: () => void;
  setValue: (value: string) => void;
}) {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [_reloaded, reload] = useBoolState(false);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      setValue(codes[0].value || '');
      exit();
    },
  });

  const device = useCameraDevice('back');

  if (!hasPermission) {
    return (
      <>
        <Text> You need to activate the camera</Text>
        <Button
          title="Request Activation"
          onPress={() => requestPermission().then(reload)}
        />
      </>
    );
  }
  if (device == null) {
    return (
      <>
        <Text> No camera was detected </Text>{' '}
      </>
    );
  }
  return (
    <View>
      <Camera
        style={styles.camera}
        device={device}
        codeScanner={codeScanner}
        isActive={true}
      />
    </View>
  );
}
