import {ImageBackground} from 'react-native';
import Main from './src/Main';
import {OnboardingMain} from './src/onboarding/OnboardingMain';
import './src/utils/polyfill';
import SolanaConnection from './src/components/context/SolanaConnection';
import {AnchorProgramProvider} from './src/components/context/SolanaAnchorProgram';
import backgroundImage from './assets/background3.png';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/languages';

function App(): React.JSX.Element {
  return (
    <>
      <ImageBackground
        source={backgroundImage}
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <I18nextProvider i18n={i18n}>
          <SolanaConnection>
            <AnchorProgramProvider>
              {/* <Main/> */}
              <OnboardingMain />
            </AnchorProgramProvider>
          </SolanaConnection>
        </I18nextProvider>
      </ImageBackground>
    </>
  );
}

export default App;
