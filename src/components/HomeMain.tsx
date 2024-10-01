import {Button, Text, View, XStack, YStack} from 'tamagui';
import {Dimensions, StyleSheet} from 'react-native';
import {ActiveComponent} from '../types/components/ActiveComponent';
import {SelectedMint} from '../functions/dlts/SelectedMint';
import {Dispatch, SetStateAction, useState} from 'react';
import {SendModal} from './Modal/SendModal';

const {width, height} = Dimensions.get('window');
const xGapRatio = width * 0.01;

export function HomeMain({
  selectedMint,
  setSelectedMint,
  priceOfSeletedMint,
  setActiveComponent,
}: {
  selectedMint: SelectedMint;
  setSelectedMint: Dispatch<SetStateAction<SelectedMint>>;
  priceOfSeletedMint: number;
  setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>;
}) {
  const [modalSendVisible, setModalSendVisible] = useState(false);
  return (
    <View>
      {/* <HomeBalances {...selectedMint} price={priceOfSeletedMint} /> */}
      <YStack padding="$1">
        {/* <View style={styles2.buttonContainer}> */}
        <SendModal
          modalVisible={modalSendVisible}
          setModalVisible={setModalSendVisible}
          selectedMint={selectedMint}
          setSelectedMint={setSelectedMint}
        />
        <XStack style={{justifyContent: 'center'}} gap={8 * xGapRatio}>
          <Button
            style={style.button}
            // onPress={() => setActiveComponent(ActiveComponent.SendComponent)}
            onPress={() => setModalSendVisible(true)}>
            <Text style={style.buttonText}>Envoyer</Text>
          </Button>
          <Button
            style={style.button}
            onPress={() =>
              setActiveComponent(ActiveComponent.ReceiveComponent)
            }>
            <Text style={style.buttonText}>Recevoir</Text>
          </Button>
          {/* <TouchableOpacity
            style={styles2.button}
            onPress={() => setActiveComponent(ActiveComponent.SendComponent)}>
            <Text style={styles2.buttonText}>Envoyer</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles2.button}
            onPress={() =>
              setActiveComponent(ActiveComponent.ReceiveComponent)
            }>
            <Text style={styles2.buttonText}>Recevoir</Text>
          </TouchableOpacity> */}
          {/* </View> */}
        </XStack>
      </YStack>
    </View>
  );
}

const style = StyleSheet.create({
  buttonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  // button: {
  //   backgroundColor: 'rgba(211, 211, 211, 0.2)', // Light grey background for glass-like effect
  //   borderWidth: 1.5, // Slightly thinner border for glass-like effect
  //   borderColor: '#3366cc', // Slightly more blueish color for border
  //   paddingVertical: 12,
  //   paddingHorizontal: 30,
  //   borderRadius: 10, // Less round with round edges
  //   marginHorizontal: 10,
  //   marginVertical: 5, // Add margin around the button
  //   width: 150, // Specified button width
  //   height: 50, // Specified button height
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   shadowColor: 'rgba(0, 0, 0, 0.2)', // Soft shadow color
  //   shadowOpacity: 0.9, // Soft shadow opacity
  //   shadowRadius: 5, // Soft shadow radius
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   elevation: 5, // Android shadow elevation
  // },
  button: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 178, 0.8)',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 255, 178, 0.3)',
    borderWidth: 1,
    width: 325 * width * 0.001, // 150 if not using with
    height: 75 * height * 0.001,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    textAlign: 'center',
  },
});
