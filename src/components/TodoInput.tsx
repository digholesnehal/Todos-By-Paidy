import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    TextInput,
    useColorScheme,
    KeyboardAvoidingView,
    Image,
    Pressable,
    Text
} from 'react-native';

import styles from '../styles/TodoInput';

type TodoProps = PropsWithChildren<{
    title?: string;
    id?: number;
}>;

function TodoInput({ title, id }: TodoProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const onChangeText = (text: string) => {
        console.log("TEXT CHANGED: ", text)
    }

    return (
        <KeyboardAvoidingView style={styles.inputContainer}>
            <TextInput
                editable
                multiline
                numberOfLines={5}
                maxLength={40}
                onChangeText={text => onChangeText(text)}
                value={title}
                style={styles.textInput}
            />
            <Pressable style={styles.button} onPress={() => console.log(id, "Item to be edited")}>
                <Text style={styles.buttonText}>ADD</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

export default TodoInput;