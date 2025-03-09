"use client"
import React, { useState } from 'react';
import TodoList from '../TodoList/TodoList';
import Button from '../Button/Button';
import AddModal from '../Modal/ModalAdd';
import EditModal from '../Modal/ModalEdit';
import { Todo } from '@/interfaces/ITask';
import useTodos from '@/hooks/todo-hook';
import { Plus } from 'lucide-react';

function TaskComponent() {
    const { todos, addTodo, saveEdit, editingTodo, toggleTodo, startEditing, deleteTodo } = useTodos();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openAddModal = () => setIsAddModalOpen(true);

    const onAddSubmit = (title: string, content: string) => {
        addTodo(title, content);
        closeAddModal()
    }
    const openEditModal = (todo: Todo) => {
        startEditing(todo);
        setIsEditModalOpen(true);
    }

    const onEditSubmit = (title: string, content: string) => {
        saveEdit( title, content);
        closeEditModal()
    }

    const closeAddModal = () => setIsAddModalOpen(false);
    const closeEditModal = () => setIsEditModalOpen(false);

    return (
        <>
            <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4">
                <div className="bg-[#0A1229] rounded-2xl p-8 w-full max-w-md shadow-2xl">
                    <h1 className="text-3xl font-bold text-white mb-8 text-center">
                        To-Do List
                    </h1>
                    <Button onClick={openAddModal} className="flex p-3 w-full bg-purple-500 rounded-3xl hover:bg-purple-600 transition-colors mb-4 cursor-pointer">
                        <span className='flex-1'>Añadir item</span>
                        <Plus className="w-6 h-6 text-white" />
                    </Button>
                    <TodoList
                        todos={todos}
                        toggleTodo={toggleTodo}
                        startEditing={openEditModal}
                        deleteTodo={deleteTodo}
                    />

                </div>
            </div>
            {/* Modal para Agregar */}
            <AddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={onAddSubmit}
            />

            {/* Modal para Editar */}
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={onEditSubmit}
                initialTitle={editingTodo ? editingTodo.title : ""}
                initialContent={editingTodo ? editingTodo.content : ""}
                createdAt={editingTodo ? editingTodo.createdAt : undefined}
                updatedAt={editingTodo ? editingTodo.updatedAt : undefined}
            />
        </>
    );
}

export default TaskComponent;
