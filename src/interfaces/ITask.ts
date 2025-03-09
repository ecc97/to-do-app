export interface Todo {
    id: number;
    title: string;
    content: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface InitialTodo {
    title: string
    content?: string;
}