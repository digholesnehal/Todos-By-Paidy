import React, { useEffect, useState, useRef } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

import TodoElement from '../components/TodoElement';
import TodoInput from '../components/TodoInput';

import { apiReq } from '../utils/api';
import * as URLS from '../config/urls';
import ImagePath from '../constants/ImagePath';


function TodosScreen(): React.JSX.Element {
    const [todoList, setTodoList] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState({ title: '', id: '' })

    const childRefInput = useRef<TextInput>(null);

    useEffect(() => {
        fetchTodoList();
    }, [])

    useEffect(() => {
        setSelectedTodo({ title: '', id: '' });
    }, [todoList])

    const fetchTodoList = () => {
        // endPoint: string, method?: string | undefined, body?: object | undefined, headers?: {"Content-Type": "application/json";} | undefined
        apiReq(URLS.GET_ALL_TODOS, 'GET').then(res => {
            setTodoList(res || []);
        }).catch(err => Alert.alert(err || "Something Went Wrong"))
    }

    const updateTodo = (title: string, id: string) => {
        setSelectedTodo({ title: title, id: id });
        childRefInput.current?.focus();
    }

    const deleteTodo = (id: string) => {
        // endPoint: string, method?: string | undefined, body?: object | undefined, headers?: {"Content-Type": "application/json";} | undefined
        apiReq(`${URLS.DELETE_TODO}${id}`, 'DELETE').then(res => {
            if (res.message === "Todo deleted successfully.") {
                fetchTodoList();
            }
            else {
                throw ("Something went wrong! Please, Try again later")
            }
        }).catch(err => Alert.alert(err || "Something Went Wrong"))
    }

    const safePadding = '5%';

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical:10, marginBottom: 20 , experimental_backgroundImage: 'linear-gradient(120deg, rgba(229, 37, 140, 0.8) 40%, #rgba(130, 60, 215, 0.6) 100%)'}}>
                <Text style={{ opacity:1,fontSize: 22, fontWeight: '900', color: '#FFF' }}> TODOs by</Text>
                <Image source={ImagePath.Horizontal_Logo} style={{
                    height: 35,
                    width: 100,
                    marginLeft: 15
                }} />
            </View>
            <ScrollView
                style={{ flex: 0.85 }}>
                <View
                    style={{
                        paddingHorizontal: safePadding,
                        paddingBottom: safePadding,
                    }}>
                    {todoList.map(({ title, _id }) => <TodoElement title={title} id={_id} key={_id} editTodo={updateTodo} deleteTodo={deleteTodo} />
                    )}
                </View>
            </ScrollView>
            <View style={{ flex: 0.15 }}>
                <TodoInput refInput={childRefInput} {...selectedTodo} fetchTodoList={fetchTodoList} />
            </View>
        </View>
    );
}

export default TodosScreen;
