import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    todoContainer: {
        backgroundColor: 'rgba(255, 0, 255, 0.2)',
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
    }
});

export default styles;