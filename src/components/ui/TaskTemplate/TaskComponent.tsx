"use client"
import React from 'react';
import Modal from '../Modal/Modal';
import TodoList from '../TodoList/TodoList';
import useTodos from '@/hooks/todo-hook';
import Button from '../Button/Button';
import { Plus } from 'lucide-react';

function TaskComponent() {
    const { todos, newTodo, setNewTodo, addTodo, saveEdit, editingTodo, handleKeyPress, toggleTodo, startEditing, deleteTodo } = useTodos();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewTodo({ title: "", content: "" });
    };

    const onSubmit = () => {
        if (editingTodo) {
            saveEdit();
        } else {
            addTodo();
        }
        closeModal();
    };



    return (
        <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4">
            <div className="bg-[#0A1229] rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    To-Do List
                </h1>
                <Button onClick={openModal} className="flex p-3 w-full bg-purple-500 rounded-3xl hover:bg-purple-600 transition-colors mb-4 cursor-pointer">
                    <span className='flex-1'>Añadir item</span>
                    <Plus className="w-6 h-6 text-white" />
                </Button>
                <TodoList
                    todos={todos}
                    toggleTodo={toggleTodo}
                    startEditing={startEditing}
                    openModal={openModal}
                    deleteTodo={deleteTodo}
                />
                <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={onSubmit} title={newTodo.title} content={newTodo.content!} setTitle={(title: string) => setNewTodo({ ...newTodo, title })} setContent={(content: string) => setNewTodo({ ...newTodo, content })} />
            </div>
        </div>
    );
}

export default TaskComponent;
