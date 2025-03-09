import { useEffect, useState } from 'react';
import { InitialTodo, Todo } from '../interfaces/ITask';


const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const addTodo = (title: string, content: string ) => {
        if (title.trim()) {
            const newTask: Todo = { id: Date.now(), title: title, content: content, completed: false, createdAt: new Date(), updatedAt: new Date() };
            setTodos([...todos, newTask]);
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const startEditing = (todo: Todo) => {
        setEditingTodo(todo);
    };

    const saveEdit = (title: string, content: string) => {
        if (editingTodo) {
            const updatedTodos = todos.map(todo =>
                todo.id === editingTodo.id ? { ...todo, title: title, content: content, updatedAt: new Date() } : todo
            );
            setTodos(updatedTodos);
            setEditingTodo(null);
        }
    };

    const deleteTodo = (id: number) => {
        if (window.confirm("Are you sure you want to delete this todo?")) {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    };

    // const handleKeyPress = (e: React.KeyboardEvent) => {
    //     if (e.key === "Enter") {
    //         if (editingTodo) {
    //             saveEdit(editingTodo.title, editingTodo.content);
    //         } else {
    //             addTodo(newTodo.title, newTodo.content);
    //         }
    //     }
    // };

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return {
        todos,
        editingTodo,
        addTodo,
        toggleTodo,
        startEditing,
        saveEdit,
        deleteTodo,
    };
};

export default useTodos;
