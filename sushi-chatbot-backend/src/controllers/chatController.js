import Product from '../models/Product.js';
import Order from '../models/Order.js';

const rules = [
    { keywords: ['hola'], reply: '¡Hola! ¿Cómo puedo ayudarte hoy?' },
    {
        keywords: ['finalizar','finalizar pedido', 'completar','completar mi pedido'],
        dynamic: async (message, userId) => {
            const orders = await Order.find({ userId, status: 'Pendiente' });
            if (orders.length === 0) {
                return 'No tienes pedidos pendientes para finalizar.';
            }
            
            const order = orders[0];
            order.status = 'Finalizado';
            await order.save();

            return `Tu pedido con un total de $${order.total} ha sido finalizado con éxito. ¡Gracias por tu compra!`;
        },
    },
    {
        keywords: ['ver pedido', 'mi pedido', 'pedido actual'],
        dynamic: async (message, userId) => {
            
            const orders = await Order.find({ userId, status: 'Finalizado' });
            if (orders.length === 0) {
                return 'No tienes pedidos pendientes. Si deseas hacer un pedido, por favor indica qué productos quieres.';
            }
            

            const order = orders[0];
            const items = order.items.map(
                (item) => `${item.quantity} x ${item.name} - $${item.quantity * item.price}`
            ).join('\n');
            return `Este es tu pedido actual:\n${items}\nTotal: $${order.total}`;
        },
    },
    {
        keywords: ['menu', 'ver el menú'],
        dynamic: async () => {
            const products = await Product.find();
            const menu = products.map((p) => `${p.name} - $${p.price}`).join('\n');
            return `Este es nuestro menú:\n${menu}`;
        },
    },
    { keywords: ['pedido', 'hacer un pedido'], reply: 'Por favor, dime qué productos deseas pedir y en qué cantidad.' },
    { keywords: ['gracias'], reply: '¡De nada! ¿Hay algo más en lo que pueda ayudarte?' },
    { keywords: ['horario', 'abierto'], reply: 'Estamos abiertos de 11:00 AM a 11:00 PM todos los días.' },
    { keywords: ['ubicados', 'direccion', 'lugar', 'donde'], reply: 'Estamos ubicados en Corrientes 1100 en ciudad de Rosario' },
    { keywords: ['contacto', 'teléfono'], reply: 'Puedes contactarnos al (+54) 123-4567.' },
    {
        keywords: ['cuanto cuesta', 'precio'],
        dynamic: async (message) => {
            const products = await Product.find();
            for (const product of products) {
                if (message.includes(product.name.toLowerCase())) {
                    return `${product.name} cuesta $${product.price}.`;
                }
            }
            return 'No encontré el producto que mencionaste. Por favor, revisa el nombre e intenta nuevamente.';
        },
    },
];

export const handleChatMessage = async (req, res) => {
    const { message } = req.body;
    const userId = req.userId || 'guest';
    if (!message) {
        return res.status(400).json({ error: 'Mensaje vacío' });
    }

    try {
        const normalizedMessage = message.toLowerCase();
        const parts = normalizedMessage.split(/[,\.y]/).map((part) => part.trim());
        let reply = '';
        const productRegex = /(\d+)\s+([a-zA-Z\s\-]+)/g;
        let items = [];

        for (const part of parts) {
            for (const rule of rules) {
                if (rule.keywords.some((keyword) => part.includes(keyword))) {
                    if (rule.dynamic) {
                        reply += `${await rule.dynamic(part, userId)}\n`;
                    } else {
                        reply += `${rule.reply}\n`;
                    }
                    break;
                }
            }

            let match;
            while ((match = productRegex.exec(part)) !== null) {
                const quantity = parseInt(match[1], 10);
                const name = match[2].trim();
                const product = await Product.findOne({ name: new RegExp(`^${name}$`, 'i') });

                if (product) {
                    items.push({
                        name: product.name,
                        quantity,
                        price: product.price,
                    });
                }
            }
        }

        if (items.length > 0) {
            const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
            const newOrder = new Order({
                userId: userId,
                items,
                total,
                status: 'Pendiente',
            });
            await newOrder.save();
            reply += `Tu pedido ha sido registrado con éxito:\n${items
                .map((item) => `${item.quantity} x ${item.name} - $${item.quantity * item.price}`)
                .join('\n')}\nTotal: $${total}`;
        }

        if (!reply.trim()) {
            reply = 'No entendí tu mensaje. Por favor, intenta nuevamente.';
        }

        return res.status(200).json({ reply: reply.trim() });
    } catch (err) {
        console.error('Error al procesar el mensaje:', err);
        return res.status(500).json({ error: 'Error al procesar el mensaje' });
    }
};
