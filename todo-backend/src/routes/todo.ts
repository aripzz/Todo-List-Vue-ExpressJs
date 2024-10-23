import { Router, Request, Response } from 'express';
import {
    getAllTodo,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    searchTodo
} from '../repository/todo';

const router = Router();



router.get('/todo', async (req: Request, res: Response) => {
    try {
        const todo = await getAllTodo();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
    }
});

router.get('/todo/search', async (req: Request, res: Response) => {
    const { search } = req.query;
    const results = await searchTodo(search as string);
    res.json(results);
});

router.get('/todo/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const item = await getTodoById(id);
    res.json(item);
});

router.post('/todo', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const newTodo = await createTodo(title, description);
    res.json(newTodo);
});

router.put('/todo/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description } = req.body;
    const updatedTodo = await updateTodo(id, title, description);
    res.json(updatedTodo);
});

router.delete('/todo/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deleteTodo(id);
    res.json({ message: 'Todo berhasil dihapus' });
});

export default router;