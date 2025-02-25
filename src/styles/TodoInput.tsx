import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textInput: {
        flex: 1,
        padding: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'rgba(128, 0, 128, 0.4)'
    },
    button: {
        width: 90,
        height: 50,
        experimental_backgroundImage: 'linear-gradient(135deg, #E5258C 0%, #823CD7 100%)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});


export default styles;