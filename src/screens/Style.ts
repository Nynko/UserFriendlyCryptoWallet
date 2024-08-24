import {StyleSheet} from 'react-native';

export const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue background
  },
  thinTitle: {
    fontSize: 48, // Increased font size for emphasis
    fontWeight: '200',
    color: '#333', // Darker color for contrast
  },
  thinSmaller: {
    fontSize: 24, // Increased font size for emphasis
    fontWeight: '200',
    color: '#333', // Darker color for contrast
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgba(211, 211, 211, 0.2)', // Light grey background for glass-like effect
    borderWidth: 1.5, // Slightly thinner border for glass-like effect
    borderColor: '#3366cc', // Slightly more blueish color for border
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10, // Less round with round edges
    marginHorizontal: 10,
    marginVertical: 5, // Add margin around the button
    width: 150, // Specified button width
    height: 50, // Specified button height
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Soft shadow color
    shadowOpacity: 0.9, // Soft shadow opacity
    shadowRadius: 5, // Soft shadow radius
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5, // Android shadow elevation
  },
  buttonText: {
    color: '#3366cc', // Slightly more blueish color for text
    fontSize: 18,
    fontWeight: '600',
  },
  squareRoundButton: {
    width: 100,
    height: 100,
    borderRadius: 10, // Make it more squared
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Make it more visible
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
