import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    //Styles for TodoScreen.tsx
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        experimental_backgroundImage: 'linear-gradient(120deg, rgba(229, 37, 140, 0.8) 40%, #rgba(130, 60, 215, 0.6) 90%)'
    },
    headerText: {
        opacity: 1,
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF'
    },
    headerLogo: {
        height: 35,
        width: 100,
        marginLeft: 15,
        borderRadius: 20,
        backgroundColor: "rgba(250, 250, 250, 0.2)"
    },
    scrollContainer: {
        flex: 0.85,
        paddingHorizontal: '5%',
        paddingBottom: '5%'
    },

    //Styles for TodoElement.tsx
    todoContainer: {
        experimental_backgroundImage: 'linear-gradient(130deg, rgba(229, 37, 140, 0.7) 40%, #rgba(130, 60, 215, 0.3) 90%)',
        width: '100%',
        minHeight: 60,
        marginVertical: 8,
        padding: 10,
        alignItems: 'center',
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
    },
    todoTitleContainer: {
        flex: 0.7,
        marginLeft: 5
    },
    todoTitle: {
        fontSize: 18,
        color: '#00008B',
        fontWeight: 'bold'
    },
    todoActionsContainer: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    editIcon: {
        height: 30,
        width: 30
    },

    //Styles for TodoInput.tsx 
    todoInputContainer: {
        flex: 0.15
    },
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