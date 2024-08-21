import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {typography} from '../../../styles/typography';

import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IdentificationFormData, RootStackParamList} from '../OnboardingMain';
import DatePicker from 'react-native-date-picker';

type PersonalInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Idendification'
>;
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import React, {useState} from 'react';

export function Idendification({navigation}: PersonalInfoScreenProps) {
  const {control, getValues} = useForm<IdentificationFormData>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  const onNext = () => {
    const data = getValues();
    navigation.navigate('Pseudo', {identification: data});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={[typography.thinTitle, styles.center]}>
          {t('accountCreation')}
        </Text>
        <View style={{marginTop: 40}}>
          <Text style={styles.center}>{t('firstName')}</Text>
          <Controller
            control={control}
            name="firstName"
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Text style={styles.center}>{t('lastName')}</Text>
          <Controller
            control={control}
            name="lastName"
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Text style={styles.center}>{t('dateOfBirth')}</Text>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  readOnly={true}
                  style={[styles.input, styles.dateInput]}
                  value={value ? value.toLocaleDateString() : t('clickHere')}
                  onPress={() => setOpen(true)}
                />
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    onChange(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </>
            )}
          />
        </View>
        <View style={{marginTop: 40}}>
          <Button title={t('next')} onPress={onNext} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
