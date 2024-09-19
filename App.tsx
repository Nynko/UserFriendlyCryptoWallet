import './src/utils/polyfill';
import SolanaConnection from './src/components/context/SolanaConnection';
import {AnchorProgramProvider} from './src/components/context/SolanaAnchorProgram';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/languages';
import {Main} from './src/Main';
import {createTamagui, TamaguiProvider} from 'tamagui';
import {config} from '@tamagui/config';

const tamaguiConfig = createTamagui(config);
type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

let counter = 0;
function App(): React.JSX.Element {
  counter++;
  console.log('App rendered', counter);
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <SolanaConnection>
          <AnchorProgramProvider>
            <TamaguiProvider config={tamaguiConfig}>
              <Main />
            </TamaguiProvider>
          </AnchorProgramProvider>
        </SolanaConnection>
      </I18nextProvider>
    </>
  );
}

export default App;
