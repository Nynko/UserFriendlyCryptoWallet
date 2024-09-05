import {ImageBackground} from 'react-native';
import './src/utils/polyfill';
import SolanaConnection from './src/components/context/SolanaConnection';
import {AnchorProgramProvider} from './src/components/context/SolanaAnchorProgram';
import backgroundImage from './assets/background3.png';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/languages';
import {Main} from './src/Main';
import {appStore} from './src/store/zustandStore';
import {createTamagui, TamaguiProvider} from 'tamagui';
import {config} from '@tamagui/config/v3';

const tamaguiConfig = createTamagui(config);
type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

function App(): React.JSX.Element {
  appStore();
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
              <TamaguiProvider config={tamaguiConfig}>
                <Main />
              </TamaguiProvider>
            </AnchorProgramProvider>
          </SolanaConnection>
        </I18nextProvider>
      </ImageBackground>
    </>
  );
}

export default App;
