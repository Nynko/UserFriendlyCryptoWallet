import { ImageBackground } from "react-native";
import Main from "./src/Main";
import { OnboardingMain } from "./src/onboarding/OnboardingMain";
import './src/utils/polyfill';
import SolanaConnection from "./src/components/context/SolanaConnection";
import { AnchorProgramProvider } from "./src/components/context/SolanaAnchorProgram";
import backgroundImage from './assets/background3.png';

function App(): React.JSX.Element {
  return (
    <>
     <ImageBackground source={backgroundImage} style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "transparent"
      }}>
        <SolanaConnection>
          <AnchorProgramProvider>
      {/* <Main/> */}
      <OnboardingMain/>
      </AnchorProgramProvider>
        </SolanaConnection>
      </ImageBackground>
    </>
  )
}


export default App;
