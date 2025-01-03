import {Dispatch, SetStateAction} from 'react';
import {Text} from 'tamagui';
import {SelectedMint} from '../../functions/dlts/SelectedMint';
import {Send} from '../Send/Send';
import {useTranslation} from 'react-i18next';
import {GeneralModal, modalStyles} from './Modal';

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
  const {t} = useTranslation();
  return (
    <GeneralModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <Text style={modalStyles.modalText}>{t('Send')}</Text>
      <Send selectedMint={selectedMint} setSelectedMint={setSelectedMint} />
    </GeneralModal>
  );
}
