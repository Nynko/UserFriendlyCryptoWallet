import {Dispatch, SetStateAction} from 'react';
import {Text} from 'tamagui';
import {SelectedMint} from '../../functions/dlts/SelectedMint';
import {useTranslation} from 'react-i18next';
import {Receive} from '../Receive/Receive';
import {GeneralModal, modalStyles} from './Modal';

export function ReceiveModal({
  modalVisible,
  setModalVisible,
  selectedMint,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  selectedMint: SelectedMint;
}) {
  const {t} = useTranslation();
  return (
    <GeneralModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <Text style={modalStyles.modalText}>{t('Receive')}</Text>
      <Receive selectedMint={selectedMint} />
    </GeneralModal>
  );
}
