import React from 'react';
import { Plus } from "lucide-react";
import Input from './Input';
import Button from '../Button/Button';

interface TodoInputProps {
    newTodo: string;
    setNewTodo: (value: string) => void;
    addTodo: () => void;
    saveEdit: () => void;
    editingTodo: boolean;
    handleKeyPress: (e: React.KeyboardEvent) => void;
}


const TodoInput: React.FC<TodoInputProps> = ({ newTodo, setNewTodo, addTodo, saveEdit, editingTodo, handleKeyPress }) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 20) {
            setNewTodo(inputValue);
        }
    };
    return (
        <div className="flex gap-2 mb-8">
            <div className="relative flex-1">
                <Input
                    type="text"
                    value={newTodo}
                    onChange={handleInput}
                    onKeyDown={handleKeyPress}
                    placeholder="Añadir item"
                    className="w-full px-4 py-3 bg-[#1A2642] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <Button
                onClick={editingTodo ? saveEdit : addTodo}
                className="p-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
            >
                <Plus className="w-6 h-6 text-white" />
            </Button>
        </div>
    );
};

export default TodoInput;
