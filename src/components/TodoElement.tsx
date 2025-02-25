import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    Text,
    useColorScheme,
    View,
    Image,
    Pressable
} from 'react-native';

import styles from '../styles/TodoElement.tsx';
import imagePath from '../constants/ImagePath';

type TodoProps = PropsWithChildren<{
    title: string;
    id: number;
}>;

function TodoElement({ title, id }: TodoProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={styles.todoContainer} key={title + id}>
            <View style={styles.todoTitleContainer}>
            <Text style={styles.todoTitle}>{title}</Text>
            </View>
            
            <View style={styles.todoActionsContainer}>
                <Pressable onPress={() => console.log(id, "ID to be edited")}>
                    <Image source={imagePath.Edit} style={styles.editIcon} />
                </Pressable>
                <Pressable onPress={() => console.log(id, "ID to be removed")}>
                    <Image source={imagePath.Remove} style={styles.editIcon} />
                </Pressable>
            </View>
        </View>
    );
}

export default TodoElement;