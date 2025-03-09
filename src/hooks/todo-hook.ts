import { useEffect, useState } from 'react';
import { InitialTodo, Todo } from '../interfaces/ITask';


const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<InitialTodo>({ title: "", content: "" });
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const addTodo = () => {
        if (todo.title.trim()) {
            const newTask: Todo = { id: Date.now(), title: todo.title, content: todo.content!, completed: false, createdAt: new Date(), updatedAt: new Date() };
            setTodos([...todos, newTask]);
            setTodo({ title: "", content: "" });
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
        setTodo({ title: todo.title, content: todo.content });
    };

    const saveEdit = () => {
        if (editingTodo) {
            const updatedTodos = todos.map(t =>
                t.id === editingTodo.id ? { ...t, ...todo, updatedAt: new Date() } : t
            );
            setTodos(updatedTodos);
            setEditingTodo(null);
            setTodo({ title: "", content: "" });
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
        todo,
        setTodo,
        editingTodo,
        addTodo,
        toggleTodo,
        startEditing,
        saveEdit,
        deleteTodo,
    };
};

export default useTodos;