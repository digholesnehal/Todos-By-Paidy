import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    //Styles for App.tsx
    appContainer: {
        height: '100%'
    },

    //Styles for Authentication.tsx
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
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