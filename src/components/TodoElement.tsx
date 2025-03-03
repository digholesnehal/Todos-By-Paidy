import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    Text,
    View,
    Image,
    Pressable
} from 'react-native';
import styles from '../styles/Todos.tsx';
import ImagePath from '../constants/ImagePath';

//Params supposed to be recieved from parent component
type TodoProps = PropsWithChildren<{
    title: string;
    id: string;
    editTodo: Function;
    deleteTodo: Function
}>;

//Reusable component to display each todo tile in a list
function TodoElement({ title, id, editTodo, deleteTodo }: TodoProps): React.JSX.Element {

    return (
        <View style={styles.todoContainer}>
            <View style={styles.todoTitleContainer}>
                <Text style={styles.todoTitle}>{title}</Text>
            </View>
            <View style={styles.todoActionsContainer}>
                <Pressable onPress={() => editTodo(title, id)} testID="edit-button">
                    <Image source={ImagePath.Edit} style={styles.editIcon} testID="edit-icon" />
                </Pressable>
                <Pressable onPress={() => deleteTodo(id)} testID="delete-button">
                    <Image source={ImagePath.Remove} style={styles.editIcon} testID="delete-icon" />
                </Pressable>
            </View>
        </View>
    );
}

export default TodoElement;