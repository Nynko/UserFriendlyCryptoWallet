import {Button, Text} from 'react-native';
import {typography} from '../../../styles/typography';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../OnboardingMain';
import {useTranslation} from 'react-i18next';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Langues'>;

export function Langues({navigation}: Props) {
  const {t, i18n} = useTranslation();
  const onNext = () => {
    navigation.navigate('Idendification');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[typography.thinTitle, styles.center]}>
          {t('welcome')}
        </Text>
        <Text style={[typography.titleText, styles.center, styles.spacing]}>
          {t('chooseLanguage')}
        </Text>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={styles.squareRoundButton}
            onPress={() => i18n.changeLanguage('en')}>
            <Text style={[styles.flag, {fontSize: 36}]}>🇺🇸</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.squareRoundButton}
            onPress={() => i18n.changeLanguage('fr')}>
            <Text style={[styles.flag, {fontSize: 36}]}>🇫🇷</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 40}}>
          <Button title={t('next')} onPress={onNext} />
        </View>
      </View>
    </>
  );
}
