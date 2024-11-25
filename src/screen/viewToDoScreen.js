import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Button, StyleSheet, RefreshControl } from "react-native";
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebaseConfig";
import TodoItem from "../components/toDoItem";

const ViewTodoScreen = ({ navigation }) => {
    // Pastikan inisialisasi tipe data benar
    const [todos, setTodos] = useState([]); // Array untuk todos
    const [refreshing, setRefreshing] = useState(false); // Boolean untuk refreshing

    const fetchTodo = useCallback(async () => {
        try {
            const querySnapshots = await getDocs(collection(db, "todos"));
            const todosData = querySnapshots.docs.map(docSnap => ({
                id: docSnap.id,
                ...docSnap.data(),
            }));
            setTodos(todosData || []); // Pastikan todosData adalah array
        } catch (error) {
            console.error("Error fetching data: ", error);
            setTodos([]); // Atur array kosong jika error
        }
    }, []);

    useEffect(() => {
        fetchTodo();
    }, [fetchTodo]);

    const handleUpdateStatus = useCallback(async (id, currentStatus) => {
        const newStatus = currentStatus === 'Doing' ? 'Done' : 'Doing';
        try {
            const todoRef = doc(db, 'todos', id);
            await updateDoc(todoRef, { status: newStatus });
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === id ? { ...todo, status: newStatus } : todo
                )
            );
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true); // Boolean: true saat mulai refresh
        await fetchTodo();
        setRefreshing(false); // Boolean: false setelah selesai refresh
    }, [fetchTodo]);

    return (
        <View style={style.container}>
            <Button
                title="Tambah To-Do Baru"
                onPress={() => navigation.navigate("AddTodo")}
            />
            <FlatList
                data={todos} // Pastikan ini adalah array
                keyExtractor={(item, index) => (item?.id ? item.id : index.toString())}
                renderItem={({ item }) => {
                    if (!item) return null; // Abaikan jika item undefined
                    return (
                        <TodoItem
                            todo={item}
                            onUpdateStatus={() => handleUpdateStatus(item.id, item.status)}
                        />
                    );
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={style.empty}>
                        <Button title="Reload" onPress={fetchTodo} />
                    </View>
                }
            />
        </View>
    );
};

const style = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    empty: { flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
});

export default ViewTodoScreen;
