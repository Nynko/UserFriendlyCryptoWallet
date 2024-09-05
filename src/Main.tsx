import {SolanaSubscriptionLogic} from './components/SolanaSubscriptionLogic';
import {Layout} from './components/utils/Layout';
import MainConnected from './MainConnected';
import {OnboardingMain} from './onboarding/OnboardingMain';
import {useIsStoreInitialized} from './store/selectors';

export function Main() {
  const initialized = useIsStoreInitialized();

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
          <MainConnected />
        </Layout>
      </>
    );
  }
}
