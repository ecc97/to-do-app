import React from 'react';
import { Todo } from '../../../interfaces/ITask';
import TodoItem from '../TodoItem/TodoItem';

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    startEditing: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
    openModal: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, startEditing, deleteTodo, openModal }) => {
    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    startEditing={startEditing}
                    deleteTodo={deleteTodo}
                    openModal={openModal} 
                />
            ))}
        </div>
    );
};

export default TodoList;
