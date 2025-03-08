import { useEffect, useState } from 'react';
import { Todo } from '@/app/interfaces/ITask';

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo("");
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
        setNewTodo(todo.text);
    };

    const saveEdit = () => {
        if (editingTodo) {
            const updatedTodos = todos.map(todo =>
                todo.id === editingTodo.id ? { ...todo, text: newTodo } : todo
            );
            setTodos(updatedTodos);
            setEditingTodo(null);
            setNewTodo("");
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
