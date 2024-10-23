import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import todoRouter from './routes/todo';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(bodyParser.json());
app.use('/api/v1', todoRouter);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});