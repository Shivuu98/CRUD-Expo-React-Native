import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const TodoItem = React.memo(({ todo, onUpdateStatus}) => {
    return(
        <View style={style.item}>
            <Text><Text style={style.title}>{todo.time}</Text></Text>
            <Text><Text style={style.title}>{todo.description}</Text></Text>
            <Text><Text style={style.title}>{todo.status}</Text></Text>
            <Button
                title={todo.status === 'Doing' ? 'Mark as Done' : 'Mark as Doing'}
                onPress={onUpdateStatus}
            />
        </View>
    );
});

const style = StyleSheet.create({
    item: {
        padding: 15,
        marginVertical: 9,
        borderRadius: 9,
        backgroundColor: '#f2f2f2',
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.1, 
        elevation: 3
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    label : {
        fontWeight: 'bold'
    }
})

export default TodoItem;