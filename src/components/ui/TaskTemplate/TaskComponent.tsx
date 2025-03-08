"use client"
import React from 'react';
import TodoInput from '../Input/TodoInput';
import TodoList from '../TodoList/TodoList';
import useTodos from '@/hooks/todo-hook';

function TaskComponent() {
    const { todos, newTodo, setNewTodo, addTodo, saveEdit, editingTodo, handleKeyPress, toggleTodo, startEditing, deleteTodo } = useTodos();
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
