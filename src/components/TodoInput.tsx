import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    TextInput,
    useColorScheme,
    KeyboardAvoidingView,
    Image,
    Pressable,
    Text
} from 'react-native';
import { apiReq } from '../utils/api';
import * as URLS from '../config/urls';
import styles from '../styles/TodoInput';


type TodoProps = PropsWithChildren<{
    refInput: React.RefObject<TextInput | null>;
    title?: string;
    id?: string;
    fetchTodoList: Function;
}>;

function TodoInput({ title = '', id, refInput, fetchTodoList }: TodoProps): React.JSX.Element {

    const [todoTitle, setTodoTitle] = useState(title || '');

    useEffect(() => {
        setTodoTitle(title);
    }, [title, id])

    const onChangeText = (text: string) => {
        setTodoTitle(text);
    }

    const updateTodo = (todoId: string) => {

        // endPoint: string, method?: string | undefined, body?: object | undefined, headers?: {"Content-Type": "application/json";} | undefined
        apiReq(`${URLS.UPDATE_TODO}${todoId}`, 'PUT', {
            title: todoTitle,
            description: 'Testing Todos',
            priority: 'High',
            status: 'In Progress',
            dueDate: "2026-11-15"
        }, { 'Content-Type': 'application/json' },)
            .then(response => {
                if (response.message === "Todo updated successfully.") {
                    setTodoTitle('');
                    refInput.current?.blur();
                    fetchTodoList();
                }
                else {
                    throw("Something went wrong! Please, Try again later")
                }
            })
            .catch(err => {
                console.log(err || 'Something went wrong!');
            });
    }


    const addNewTodo = () => {
        // endPoint: string, method?: string | undefined, body?: object | undefined, headers?: {"Content-Type": "application/json";} | undefined
        apiReq(`${URLS.ADD_NEW_TODO}`, 'POST', {
            title: todoTitle,
            description: 'Testing Todos',
            priority: 'High',
            status: 'In Progress',
            dueDate: "2026-11-15"
        }, { 'Content-Type': 'application/json' },)
            .then(response => {
                if (response.message === "Todo added successfully.") {
                    setTodoTitle('');
                    refInput.current?.blur();
                    fetchTodoList();
                }
                else {
                    throw("Something went wrong! Please, Try again later")
                }
            })
            .catch(err => {
                console.log(err || 'Something went wrong!');
            });
    }

    return (
        <KeyboardAvoidingView style={styles.inputContainer}>
            <TextInput
                ref={refInput}
                editable
                multiline
                numberOfLines={5}
                maxLength={40}
                onChangeText={text => onChangeText(text)}
                defaultValue={todoTitle}
                value={todoTitle}
                style={styles.textInput}
            />
            <Pressable style={styles.button} onPress={() => id ? updateTodo(id) : addNewTodo()}>
                <Text style={styles.buttonText}>{id ? 'Update' : 'ADD'}</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

export default TodoInput;