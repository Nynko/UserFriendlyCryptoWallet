import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

import commonEn from './locales/en/common.json';
import commonFr from './locales/fr/common.json';
import errorsEn from './locales/en/errors.json';
import errorsFr from './locales/fr/errors.json';
import transactionsEn from './locales/en/transactions.json';
import transactionsFr from './locales/fr/transactions.json';
import onboardingEn from './locales/en/onboarding.json';
import onboardingFr from './locales/fr/onboarding.json';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: true,
    supportedLngs: ['en', 'fr'],
    ns: ['common', 'errors', 'transactions', 'onboarding'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common: commonEn,
        errors: errorsEn,
        transactions: transactionsEn,
        onboarding: onboardingEn,
      },
      fr: {
        common: commonFr,
        errors: errorsFr,
        transactions: transactionsFr,
        onboarding: onboardingFr,
      },
    },
  });

export default i18n;
