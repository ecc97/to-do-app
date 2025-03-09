import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    content: string;
    setTitle: (value: string) => void;
    setContent: (value: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, content, setTitle, setContent }) => {
    if (!isOpen) return null;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 20) {
            setTitle(inputValue);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="bg-white p-4 rounded shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer">
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Agregar/Editar Tarea</h2>
                <input
                    type="text"
                    value={title}
                    onChange={handleInput}
                    placeholder="Título"
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Descripción"
                    className="border p-2 mb-4 w-full"
                />
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded cursor-pointer">Cancelar</button>
                    <button onClick={onSubmit} className="bg-blue-500 text-white p-2 rounded cursor-pointer">Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
