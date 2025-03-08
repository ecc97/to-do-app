"use client"
import React, { useEffect, useState } from 'react'
import { Plus, Check, X, Edit2 } from "lucide-react";
import { Todo } from '@/app/interfaces/ITask';

function TaskComponent() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            // localStorage.setItem("todos", JSON.stringify([...todos, { id: Date.now(), text: newTodo, completed: false }]));
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
            // setTodos(todos.map(todo => 
            //     todo.id === editingTodo.id ? { ...todo, text: newTodo } : todo
            // ));
            // localStorage.setItem("todos", JSON.stringify(todos.map(todo => 
            //     todo.id === editingTodo.id ? { ...todo, text: newTodo } : todo
            // )));
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

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 20) {
            setNewTodo(inputValue);
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

                {/* Input section */}
                <div className="flex gap-2 mb-8">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={handleInput}
                            onKeyDown={handleKeyPress}
                            placeholder="Añadir item"
                            className="w-full px-4 py-3 bg-[#1A2642] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        onClick={editingTodo ? saveEdit : addTodo}
                        className="p-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
                    >
                        <Plus className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Todo list */}
                <div className="space-y-3">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex items-center gap-2 bg-[#1A2642] rounded-full p-2 pr-3 group"
                        >
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className={`p-2 rounded-full transition-colors ${todo.completed ? "bg-green-500" : "bg-[#2A3754] hover:bg-[#374869]"
                                    }`}
                            >
                                <Check className={`w-5 h-5 ${todo.completed ? "text-white" : "text-transparent"}`} />
                            </button>
                            <span
                                className={`flex-1 text-white ${todo.completed ? "line-through text-gray-400" : ""
                                    }`}
                            >
                                {todo.text}
                            </span>
                            <div className="flex gap-1">
                                <button
                                    className="p-2 rounded-full hover:bg-[#2A3754] transition-colors"
                                    onClick={() => {startEditing(todo);}}
                                >
                                    <Edit2 className="w-4 h-4 text-cyan-400" />
                                </button>
                                <button
                                    className="p-2 rounded-full hover:bg-[#2A3754] transition-colors"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    <X className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskComponent
