"use client"
import React, { useEffect, useState } from 'react';
import TodoInput from '../Input/TodoInput';
import TodoList from '../TodoList/TodoList';
import { Todo } from '@/app/interfaces/ITask';

function TaskComponent() {
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

    return (
        <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4">
            <div className="bg-[#0A1229] rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    To-Do List
                </h1>
                <TodoInput
                    newTodo={newTodo}
                    setNewTodo={setNewTodo}
                    addTodo={addTodo}
                    saveEdit={saveEdit}
                    editingTodo={!!editingTodo}
                    handleKeyPress={handleKeyPress}
                />
                <TodoList
                    todos={todos}
                    toggleTodo={toggleTodo}
                    startEditing={startEditing}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    );
}

export default TaskComponent;
