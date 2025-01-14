import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors'

dotenv.config();

// Inicialización
const app = express();
app.use(bodyParser.json());

// Conexión a MongoDB
connectDB();

app.use(cors({
    origin: 'http://localhost:5173', // Dirección del frontend
    methods: ['GET', 'POST'], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados con credenciales
}));

// Rutas
app.use('/chat', chatRoutes);
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);
app.use(errorHandler);


export default app;