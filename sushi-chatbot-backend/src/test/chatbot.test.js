import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

describe('Chatbot Sushi API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Product.insertMany([
          { name: 'California Roll', description: 'Roll with crab, avocado, and cucumber', price: 1200 },
          { name: 'Sake Nigiri', description: 'Fresh salmon on rice', price: 900 },
          { name: 'Fanta', description: 'Refreshing drink', price: 500 },
      ]);
    });

    afterAll(async () => {
        await Product.deleteMany();
        await Order.deleteMany();
        await mongoose.connection.close();
    });

    describe('GET /menu', () => {
        it('debe obtener el menú correctamente', async () => {
            const res = await request(app).get('/menu');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0]).toHaveProperty('name');
        });
    });

    describe('POST /order', () => {
        it('debe registrar un pedido correctamente', async () => {
          const product = await Product.findOne({ name: 'California Roll' });
          const res = await request(app).post('/order').send({
              userId: '12345',
              items: [
                  { name: product.name, quantity: 2 },
              ],
              total: product.price * 2,
              status: 'pending',
          });
      
          expect(res.statusCode).toBe(201);
          expect(res.body).toHaveProperty('userId', '12345');
          expect(res.body.items.length).toBe(1);
          expect(res.body).toHaveProperty('total');
        });

        it('debe devolver un error si los datos son inválidos', async () => {
            const res = await request(app).post('/order').send({
                customerName: '',
                items: [],
            });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
        it('debe procesar pedidos múltiples correctamente', async () => {
          const res = await request(app).post('/chat').send({
              message: '2 California Roll, 3 Fanta, 1 Sake Nigiri',
          });
      
          expect(res.statusCode).toBe(200); // Cambiado de 201 a 200
          expect(res.body.reply).toContain('2 x California Roll');
          expect(res.body.reply).toContain('3 x Fanta');
          expect(res.body.reply).toContain('1 x Sake Nigiri');
          expect(res.body.reply).toContain('Total: $4800');
      });
    });

    describe('POST /chat', () => {
        it('debe responder con un saludo', async () => {
            const res = await request(app).post('/chat').send({ message: 'Hola' });
            expect(res.statusCode).toBe(200);
            expect(res.body.reply).toBe('¡Hola! ¿Cómo puedo ayudarte hoy?');
        });

        
        it('debe mostrar el menú al pedirlo', async () => {
          const res = await request(app).post('/chat').send({ message: 'Muéstrame el menú' });
          expect(res.statusCode).toBe(200);
          expect(res.body.reply).toContain('California Roll');
          expect(res.body.reply).toContain('Sake Nigiri');
          expect(res.body.reply).toContain('Coca-Cola');
        });

        it('debe manejar mensajes no reconocidos', async () => {
            const res = await request(app).post('/chat').send({ message: '¿Qué hora es?' });
            expect(res.statusCode).toBe(200);
            expect(res.body.reply).toBe('No entendí tu mensaje. Por favor, intenta nuevamente.');
        });
    });
});