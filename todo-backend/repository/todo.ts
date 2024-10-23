import db from '../db';

interface Todo {
    id: number;
    title: string;
    description: string;
}

export function getAllTodo(): Promise<Todo[]> {
    return db.any<Todo>('SELECT * FROM todo order by created_at DESC');
}

export function getTodoById(id: number): Promise<Todo> {
    return db.one<Todo>('SELECT * FROM todo WHERE id = $1', id);
}

export function searchTodo(search: string): Promise<Todo[]> {
    if (!search) {
        return Promise.resolve([]);
    }

    return db.any<Todo>('SELECT * FROM todo WHERE title ILIKE $1 OR description ILIKE $1 order by created_at DESC', `%${search}%`);
}

export function createTodo(title: string, description: string): Promise<Todo> {
    return db.one<Todo>('INSERT INTO todo(title, description) VALUES($1, $2) RETURNING *', [title, description]);
}

export function updateTodo(id: number, title: string, description: string): Promise<Todo> {
    return db.one<Todo>('UPDATE todo SET title=$1, description=$2 WHERE id=$3 RETURNING *', [title, description, id]);
}

export function deleteTodo(id: number): Promise<null> {
    return db.none('DELETE FROM todo WHERE id = $1', id);
}