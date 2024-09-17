import {SolanaSubscriptionLogic} from './components/SolanaSubscriptionLogic';
import {Layout} from './components/utils/Layout';
import MainConnected from './MainConnected';
import {OnboardingMain} from './onboarding/OnboardingMain';
import LaunchingScreen from './onboarding/Test';
import {useIsStoreInitialized} from './store/selectors';

let counter = 0;
export function Main() {
  const initialized = useIsStoreInitialized();
  counter++;
  console.log('Main rendered', counter);
  if (!initialized) {
    return (
      <>
        <OnboardingMain />
      </>
    );
  } else {
    return (
      <>
        <SolanaSubscriptionLogic />
        <Layout>
          {/* <MainConnected /> */}
          <LaunchingScreen />
        </Layout>
      </>
    );
  }
}
