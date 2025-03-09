"use client";
import React, { useState } from "react";
import Button from "../Button/Button";
import { X } from "lucide-react";

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, content: string) => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const closeModal = () => {
        onClose();
        setTitle("");
        setContent("");
    }

    if (!isOpen) return null;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 20) {
            setTitle(inputValue);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onAdd(title, content);
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-md relative">
                {/* Botón de cierre (X) */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    <X />
                </button>
                <h2 className="text-xl font-bold mb-4">Añadir Item</h2>
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
                        onClick={closeModal}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            onAdd(title, content);
                            closeModal();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
