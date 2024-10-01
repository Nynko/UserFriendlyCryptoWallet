import {Dispatch, SetStateAction} from 'react';
import {Alert, Modal, Pressable, StyleSheet} from 'react-native';
import {Text, View} from 'tamagui';
import {SelectedMint} from '../../functions/dlts/SelectedMint';
import {Send} from '../Send/Send';

export function SendModal({
  modalVisible,
  setModalVisible,
  selectedMint,
  setSelectedMint,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  selectedMint: SelectedMint;
  setSelectedMint: Dispatch<SetStateAction<SelectedMint>>;
}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Send
              selectedMint={selectedMint}
              setSelectedMint={setSelectedMint}
              closingFunction={() => setModalVisible(!modalVisible)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
