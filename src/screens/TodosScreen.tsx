import React, { useEffect, useState, useRef } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import TodoElement from '../components/TodoElement';
import TodoInput from '../components/TodoInput';

import styles from '../styles/Todos';

import { apiReq } from '../utils/api';
import * as URLS from '../config/urls';
import ImagePath from '../constants/ImagePath';


function TodosScreen(): React.JSX.Element {
    const [todoList, setTodoList] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState({ title: '', id: '' });
    const [loading, setLoading] = useState(true);

    //Arefernce for input box is created, to handle focus and blur events from outside methods
    const childRefInput = useRef<TextInput>(null);

    useEffect(() => {
        //To get a list of todos on screen visit
        fetchTodoList();
    }, [])

    useEffect(() => {
        //To reassign initial values once data is refetched
        setSelectedTodo({ title: '', id: '' });
    }, [todoList])

    const fetchTodoList = () => {
        setLoading(true);
        // endPoint: string, method?: string | undefined, body?: object | undefined, headers?: object | undefined
        apiReq(URLS.GET_ALL_TODOS, 'GET').then(res => {
            setTodoList(res || []);
            setLoading(false);
        }).catch(err => Alert.alert(err || "Something Went Wrong"))
    }

    const updateTodo = (title: string, id: string) => {
        //To change the Add/Update button flag, title and id values are set to pass to child component 
        setSelectedTodo({ title: title, id: id });
        childRefInput.current?.focus();
    }

    const deleteTodo = (id: string) => {
        setLoading(true);
        //To delete an existing todo from a list, fetch API is called using DELETE method
        // endPoint: string, method?: string | undefined, body?: object | undefined, headers?: object | undefined
        apiReq(`${URLS.DELETE_TODO}${id}`, 'DELETE').then(res => {
            setLoading(false);
            if (res.message === "Todo deleted successfully.") {
                //In case of a success response, list need to be refetched to show newly reduced list
                fetchTodoList();
            }
            else {
                throw ("Something went wrong! Please, Try again later")
            }
        }).catch(err => Alert.alert(err || "Something Went Wrong"))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container} >
            {loading &&
                <ActivityIndicator testID='activityIndicator' size="large" color="#0000ff" style={styles.loading} />}
            <View style={styles.header}>
                <Text style={styles.headerText}> TODOs by</Text>
                <Image source={ImagePath.Horizontal_Logo} style={styles.headerLogo} />
            </View>
            <ScrollView style={styles.scrollContainer}>
                {todoList.length ? todoList.map(({ title, _id }) => <TodoElement title={title} id={_id} key={_id} editTodo={updateTodo} deleteTodo={deleteTodo} />
                ) : null}
            </ScrollView>
            <View style={styles.todoInputContainer}>
                <TodoInput refInput={childRefInput} {...selectedTodo} fetchTodoList={fetchTodoList} />
            </View>
        </KeyboardAvoidingView>
    );
}

export default TodosScreen;
