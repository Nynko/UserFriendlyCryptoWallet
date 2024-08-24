import {StyleSheet} from 'react-native';

export const mainStyle = StyleSheet.create({
  errorText: {
    color: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thinTitle: {
    // Add your typography styles here
    fontSize: 24, // Example style
    fontWeight: '200', // Example style
  },
  thinSmaller: {
    // Add your typography styles here
    fontSize: 16, // Example style
    fontWeight: '200', // Example style
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
});
