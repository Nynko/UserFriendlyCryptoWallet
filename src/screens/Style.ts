import { StyleSheet } from "react-native";

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
        backgroundColor: '#007bff', // Blue color for buttons
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginHorizontal: 10,
        width: 150, // Specified button width
        height: 50, // Specified button height
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // White text for contrast
        fontSize: 18,
        fontWeight: '600',
    },
});
