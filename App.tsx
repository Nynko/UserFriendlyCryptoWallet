import {ImageBackground} from 'react-native';
import './src/utils/polyfill';
import SolanaConnection from './src/components/context/SolanaConnection';
import {AnchorProgramProvider} from './src/components/context/SolanaAnchorProgram';
import backgroundImage from './assets/background3.png';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/languages';
import {Main} from './src/Main';
import {MmkvProvider} from './src/components/context/MmkvProvider';

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
          <MmkvProvider>
            <SolanaConnection>
              <AnchorProgramProvider>
                <Main />
              </AnchorProgramProvider>
            </SolanaConnection>
          </MmkvProvider>
        </I18nextProvider>
      </ImageBackground>
    </>
  );
}

export default App;
