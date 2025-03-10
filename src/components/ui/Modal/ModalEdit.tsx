"use client";
import React from "react";
import Button from "../Button/Button";
import { X } from "lucide-react";
import { InitialTodo } from "@/interfaces/ITask";
import { formatDate } from "@/utils/formaDate";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    todo: InitialTodo;
    setTodo: (todo: InitialTodo) => void;
    createdAt?: Date;
    updatedAt?: Date;
}

const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    onClose,
    onSave,
    todo,
    setTodo,
    createdAt,
    updatedAt
}) => {

    if (!isOpen) return null;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 20) {
            setTodo({ ...todo, title: inputValue });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSave();
            onClose();
        }
    };

    const createdAtTodo = new Date(createdAt!);
    const updatedAtTodo = new Date(updatedAt!);
    const formattedCreatedAt = createdAt ? formatDate(createdAtTodo) : '';
    const formattedUpdatedAt = updatedAt ? formatDate(updatedAtTodo) : '';


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-md relative">
                {/* Botón de cierre (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                    <X />
                </button>
                <h2 className="text-xl font-bold mb-4">Editar Item</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Título</label>
                    <input
                        type="text"
                        value={todo.title}
                        onChange={handleInput}
                        onKeyDown={handleKeyPress}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Descripción</label>
                    <textarea
                        value={todo.content}
                        onChange={(e) => setTodo({ ...todo, content: e.target.value })}
                        onKeyDown={handleKeyPress}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            onSave();
                            onClose();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Guardar
                    </Button>
                </div>
                <div className="flex flex-col justify-between mt-2">    
                    {formattedCreatedAt === formattedUpdatedAt ? 
                     <span className="text-gray-600">Creado: {formattedCreatedAt}</span>
                     : 
                     <span className="text-gray-600">Actualizado: {formattedUpdatedAt}</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default EditModal;