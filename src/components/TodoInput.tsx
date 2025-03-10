import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    TextInput,
    Pressable,
    Text,
    Alert,
    View
} from 'react-native';
import { apiReq } from '../utils/api';
import * as URLS from '../config/urls';
import styles from '../styles/Todos';

//Params supposed to be recieved from parent component
type TodoProps = PropsWithChildren<{
    refInput: React.RefObject<TextInput | null>;
    title?: string;
    id?: string;
    fetchTodoList: Function;
}>;

function TodoInput({ title = '', id, refInput, fetchTodoList }: TodoProps): React.JSX.Element {
    const [todoTitle, setTodoTitle] = useState(title || '');

    useEffect(() => {
        //In case of update of existing todo
        //This will run as soon as title or id value (params recieved from parent component) is set or unset onPress of edit button
        setTodoTitle(title);
    }, [title, id])

    const onChangeText = (text: string) => {
        //To set a text value for input box
        setTodoTitle(text);
    }

    const updateTodo = (todoId: string) => {
        //To update an existing todo from list on server, fetch API is called using PUT method here
        //endPoint: string, method?: string | undefined, body?: object | undefined, headers?: object | undefined
        apiReq(`${URLS.UPDATE_TODO}${todoId}`, 'PUT', {
            title: todoTitle,
            description: 'Testing Todos',
            priority: 'High',
            status: 'In Progress',
            dueDate: "2026-11-15"
        }, { 'Content-Type': 'application/json' },)
            .then(response => {
                if (response.message === "Todo updated successfully.") {
                    //If successfully updated a todo title
                    setTodoTitle('');
                    refInput.current?.blur();
                    fetchTodoList();
                }
                else {
                    throw("Something went wrong! Please, Try again later")
                }
            })
            .catch(err => {
                Alert.alert(err || 'Something went wrong!');
            });
    }


    const addNewTodo = () => {
        //To add new todo in a list on server data, fetch API is called using POST method here
        // endPoint: string, method?: string | undefined, body?: object | undefined, headers?: object | undefined
        apiReq(`${URLS.ADD_NEW_TODO}`, 'POST', {
            title: todoTitle,
            description: 'Testing Todos',
            priority: 'High',
            status: 'In Progress',
            dueDate: "2026-11-15"
        }, { 'Content-Type': 'application/json' },)
            .then(response => {
                if (response.message === "Todo added successfully.") {
                    //In case of a success response, list need to be refetched to show newly added todo
                    setTodoTitle('');
                    refInput.current?.blur();
                    fetchTodoList();
                }
                else {
                    throw("Something went wrong! Please, Try again later")
                }
            })
            .catch(err => {
                Alert.alert(err || 'Something went wrong!');
            });
    }

    return (
        <View style={styles.inputContainer}>
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
                testID="todo-input"
            />
            <Pressable style={styles.button} onPress={() => id ? updateTodo(id) : addNewTodo()}>
                <Text style={styles.buttonText}>{id ? 'Update' : 'ADD'}</Text>
            </Pressable>
        </View>
    );
}

export default TodoInput;