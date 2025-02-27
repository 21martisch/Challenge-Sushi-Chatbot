import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { assignUserId } from './middleware/assignUserId.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(assignUserId);

app.use('/chat', chatRoutes);
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);
app.use(errorHandler);


export default app;