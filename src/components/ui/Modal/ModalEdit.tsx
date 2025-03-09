"use client";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { X } from "lucide-react";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, content: string) => void;
    initialTitle: string;
    initialContent: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialTitle,
    initialContent,
    createdAt,
    updatedAt,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setTitle(initialTitle);
        setContent(initialContent);
    }, [initialTitle, initialContent]);

    if (!isOpen) return null;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 20) {
            setTitle(inputValue);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSave(title, content);
            onClose();
        }
    };

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
    };

    const createdAtTodo = new Date(createdAt || 0);
    const updatedAtTodo = new Date(updatedAt || 0);
    const formattedCreatedAt = createdAt ? formatDate(createdAtTodo) : '';
    const formattedUpdatedAt = updatedAt ? formatDate(updatedAtTodo) : '';


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-md relative">
                {/* Botón de cierre (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    <X />
                </button>
                <h2 className="text-xl font-bold mb-4">Editar Item</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleInput}
                        onKeyDown={handleKeyPress}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Descripción</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            onSave(title, content);
                            onClose();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </Button>
                </div>
                <div className="flex flex-col justify-between mt-2">    
                    {createdAt && <span className="text-gray-600">Creado: {formattedCreatedAt}</span>}
                    {updatedAt && <span className="text-gray-600">Actualizado: {formattedUpdatedAt}</span>}
                </div>
            </div>
        </div>
    );
};

export default EditModal;
