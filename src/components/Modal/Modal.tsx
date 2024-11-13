import {Dispatch, SetStateAction} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'tamagui';
import {X} from '@tamagui/lucide-icons';

export function GeneralModal({
  children,
  modalVisible,
  setModalVisible,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <View style={modalStyles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={[modalStyles.buttonClose, modalStyles.touchableArea]}>
              <X
                size={6 * sizeRatio}
                color={'grey'}
                onPress={() => setModalVisible(!modalVisible)}
                style={modalStyles.buttonClose}
              />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const {width} = Dimensions.get('window');
const sizeRatio = width * 0.01;

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '13%',
    paddingTop: '10%',
    maxWidth: '80%',
    maxHeight: '60%',
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
    position: 'absolute',
    top: '5%',
    right: '5%',
  },
  touchableArea: {
    padding: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
