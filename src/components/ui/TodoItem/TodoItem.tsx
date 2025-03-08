import React from 'react';
import { Check, X, Edit2 } from "lucide-react";
import { Todo } from '../../../interfaces/ITask';
import Button from '../Button/Button';

interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: number) => void;
    startEditing: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, startEditing, deleteTodo }) => {
    return (
        <div className="flex items-center gap-2 bg-[#1A2642] rounded-full p-2 pr-3 group">
            <Button
                onClick={() => toggleTodo(todo.id)}
                className={`p-2 rounded-full transition-colors ${todo.completed ? "bg-green-500" : "bg-[#2A3754] hover:bg-[#374869]"}`}
            >
                <Check className={`w-5 h-5 ${todo.completed ? "text-white" : "text-transparent"}`} />
            </Button>
            <span className={`flex-1 text-white ${todo.completed ? "line-through text-gray-400" : ""}`}>
                {todo.text}
            </span>
            <div className="flex gap-1">
                <Button
                    className="p-2 rounded-full hover:bg-[#2A3754] transition-colors"
                    onClick={() => startEditing(todo)}
                >
                    <Edit2 className="w-4 h-4 text-cyan-400" />
                </Button>
                <Button
                    className="p-2 rounded-full hover:bg-[#2A3754] transition-colors"
                    onClick={() => deleteTodo(todo.id)}
                >
                    <X className="w-4 h-4 text-red-400" />
                </Button>
            </div>
        </div>
    );
};

export default TodoItem;
