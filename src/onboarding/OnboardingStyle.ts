import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const onboardingStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCenteredHorizontal: {
    alignItems: 'center',
  },
  buttonContainer: {
    top: height * 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18 * height * 0.001,
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
  },
  index1: {
    zIndex: 1,
  },
  ChevronLeftIcon: {
    top: height * 0.12,
    left: width * 0.08,
    zIndex: 1,
  },
  titlesContainer: {
    top: height * 0.05,
  },
  screenTitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: height * 0.1,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '300',
    fontFamily: 'Montserrat-regular',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(18, 17, 17, 0.17)',
    width: width * 0.75,
  },
  inputContainer: {
    width: width * 0.75,
  },
  textAboveInput: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '300',
    fontFamily: 'Montserrat-regular',
    textAlign: 'left',
    left: width * 0.03,
    paddingBottom: height * 0.01,
  },
});
