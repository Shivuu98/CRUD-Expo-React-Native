import React, { useEffect, useState, useCallback } from "react";
import { View, Flatlist, Button, StyleSheet, RefreshControl } from "react-native";
import { collection, getDocs, updateDoc, doc } from "react-native-firebase/firestore";
import { db } from "../config/firebaseConfig";
import TodoItem from "../components/toDoItem";

const viewTodoScreen = ({ navigation }) => {
    const { todo, setTodo } = useState ([]);
    const { refreshing, setRefreshing } = useState ([]);

    const fetchTodo = useCallback(async() => {
        try{
            const querySnapshots = await getDocs( collection, ( db, "todo "));
            const todoData = querySnapshots.docs.map(docSnap => ({
                id: docSnap.id,
                ...docSnap.data()
            }));
            setTodo(todoData);
        } catch (error) {
            console.error("Error fetching data : ", error);
        }
    }, []);

    useEffect(() =>{
        fetchTodo();
    }, [fetchTodo]);

    const handleUpdateStatus = useCallback(async(id, currentStatus) => {
            const newStatus = currentStatus === 'Doing' ? 'Done' : 'Doing';
            try{
                const todoRef = docs(db, 'todo', id);
                await updateDoc(todoRef, {status:newStatus});
                setTodo(prevTodo => 
                    prevTodo.map(todo =>
                        todo.id === id ? {...todo, status:newStatus} : todo
                    )
                );
            } catch (error) {
                console.error("Error fetching data : ", error);
            }
    }, []);

    const onRefresh = useCallback(async()  => {
        setRefreshing(true);
        await fetchTodo();
        setRefreshing(false);
    }, [fetchTodo]);

    return (
        <View style ={style.container}>
            <Button
                title="Tambah To-Do Baru"
                onPress={() => navigation.navigate("addTodo")}
            />
            <Flatlist
                data={todo}
                keyExtractor={({item}) => item.id}
                renderItem={({tem}) => (
                    <TodoItem
                        todo={item}
                        onUpdateStatus={() => handleUpdateStatus(item.id, item.status)}
                    />
                )}
                RefreshControl ={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
                ListEmptyComponent={ <View style={style.empty}><Button title="Reload" onPress={fetchTodo}/></View> }
            />
        </View>
    );
};

const style = StyleSheet.create({
    container: {flex:1, padding: 20, backgroundColor:'#fff'},
    empty: {flex:1, padding:10, justifyContent:'center', alignContent:'item', marginTop: 50},
})

export default viewTodoScreen