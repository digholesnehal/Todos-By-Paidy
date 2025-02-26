import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    Text,
    View,
    Image,
    Pressable
} from 'react-native';
import styles from '../styles/TodoElement.tsx';
import ImagePath from '../constants/ImagePath';

type TodoProps = PropsWithChildren<{
    title: string;
    id: string;
    editTodo: Function;
    deleteTodo: Function
}>;

function TodoElement({ title, id, editTodo, deleteTodo }: TodoProps): React.JSX.Element {
    
    return (
        <View style={styles.todoContainer}>
            <View style={styles.todoTitleContainer}>
                <Text style={styles.todoTitle}>{title}</Text>
            </View>

            <View style={styles.todoActionsContainer}>
                <Pressable onPress={() => editTodo(title, id)}>
                    <Image source={ImagePath.Edit} style={styles.editIcon} />
                </Pressable>
                <Pressable onPress={() => deleteTodo(id)}>
                    <Image source={ImagePath.Remove} style={styles.editIcon} />
                </Pressable>
            </View>
        </View>
    );
}

export default TodoElement;