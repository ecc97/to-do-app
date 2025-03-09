import { useEffect, useState } from 'react';
import { InitialTodo, Todo } from '../interfaces/ITask';


const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<InitialTodo>({ title: "", content: "" });
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const addTodo = () => {
        if (newTodo.title.trim()) {
            const newTask: Todo = { id: Date.now(), title: newTodo.title, content: newTodo.content!, completed: false, createdAt: new Date(), updatedAt: new Date() };
            setTodos([...todos, newTask]);
            setNewTodo({ title: "", content: "" });
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
        setNewTodo({ title: todo.title, content: todo.content });
    };

    const saveEdit = () => {
        if (editingTodo) {
            const updatedTodos = todos.map(todo =>
                todo.id === editingTodo.id ? { ...todo, ...newTodo, updatedAt: new Date() } : todo
            );
            setTodos(updatedTodos);
            setEditingTodo(null);
            setNewTodo({ title: "", content: "" });
        }
    };

    const deleteTodo = (id: number) => {
        if (window.confirm("Are you sure you want to delete this todo?")) {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (editingTodo) {
                saveEdit();
            } else {
                addTodo();
            }
        }
    };

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
        newTodo,
        setNewTodo,
        editingTodo,
        addTodo,
        toggleTodo,
        startEditing,
        saveEdit,
        deleteTodo,
        handleKeyPress,
    };
};

export default useTodos;
