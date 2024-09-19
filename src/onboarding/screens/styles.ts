import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  spacing: {
    marginTop: 20, // Add spacing between the texts
  },
  center: {
    textAlign: 'center',
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
  container: {
    flex: 1,
    marginTop: '33.33%', // Set marginTop to 33.33% for 2/3 positioning
  },

  input: {
    height: 40,
    width: '50%', // Set the width to 50% for not full width
    marginLeft: '25%', // Add margin to the left
    marginRight: '25%', // Add margin to the right
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5, // Add a bit of roundness to the edges
    backgroundColor: 'white', // Set a white background color
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Add a shadow effect
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },

  dateInput: {
    textAlign: 'center',
  },
});
