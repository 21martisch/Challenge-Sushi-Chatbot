# Sushi Chatbot

Un chatbot diseñado para facilitar la realización de pedidos de sushi. Este proyecto incluye un backend en Node.js y MongoDB, así como un frontend simple en React con Vite. El chatbot es capaz de:

- Mostrar el menú.
- Tomar pedidos básicos.
- Responder preguntas frecuentes (por ejemplo: horarios, ubicación).
- Administrar pedidos en curso.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB.
- **Frontend:** React.js, Vite, Tailwind CSS.
- **Pruebas:** Jest, Supertest.

---

## Requisitos previos

1. Tener Node.js (versión 16 o superior) instalado.
2. Tener MongoDB instalado y en ejecución localmente o contar con una conexión remota.

---

## Configuración del proyecto

### Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/21martisch/Challenge-Sushi-Chatbot.git
   cd Challenge-Sushi-Chatbot/sushi-chatbot-backend
   ```

2. Crea un archivo `.env` en la carpeta `sushi-chatbot-backend` basado en el archivo `.env.example`:
   ```plaintext
   MONGO_URI=tu_conexion_a_mongodb
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Carga los datos iniciales en la base de datos:
   ```bash
   node src/seed.js
   ```

5. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Frontend

1. Cambia al directorio del frontend:
   ```bash
   cd ../sushi-chatbot-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm run dev
   ```

4. Accede a la aplicación en tu navegador en `http://localhost:5173`.

---

## Ejemplos de mensajes que entiende el bot

### Preguntas frecuentes
- **Horarios:**
  ```
  ¿Están abiertos?
  ```
  Respuesta: "Estamos abiertos todos los días de 11:00 AM a 11:00 PM."

- **Ubicación:**
  ```
  ¿Dónde están ubicados?
  ```
  Respuesta: "Nos encontramos en Corrientes 1100, Ciudad de Rosario."

- **Contacto:**
  ```
  ¿Cuál es el número de contacto?
  ```
  Respuesta: "Puedes contactarnos al (+54) 123-4567."

### Menú
- Solicitar el menú:
  ```
  Quiero ver el menú
  ```
  Respuesta: "¡Aquí está nuestro menú! \n\n🍣 Sake Nigiri - $10\n🍣 California Roll - $12\n..."

### Pedidos
- Crear un nuevo pedido:
  ```
  Quiero 2 Sake Nigiri
  ```
  Respuesta: "Tu pedido ha sido registrado con éxito: \n2 x Sake Nigiri - $20 \nTotal: $20."

- Agregar productos a un pedido existente:
  ```
  Agrega 1 California Roll
  ```
  Respuesta: "Los siguientes productos han sido añadidos a tu pedido: \n1 x California Roll - $12 \nTotal actualizado: $32."

- Finalizar pedido:
  ```
  Finalizar pedido
  ```
  Respuesta: "Tu pedido de $32 ha sido finalizado con éxito. ¡Gracias por tu compra!"

---

## Endpoints disponibles

### `/chat` [POST]
Procesa mensajes del usuario y devuelve la respuesta del chatbot.

#### Ejemplo de solicitud:
```json
{
  "message": "Quiero ver el menú"
}
```

#### Ejemplo de respuesta:
```json
{
  "reply": "¡Aquí está nuestro menú! \n\n🍣 Sake Nigiri - $10\n🍣 California Roll - $12\n..."
}
```

### `/menu` [GET]
Devuelve el menú completo de productos disponibles.

#### Ejemplo de respuesta:
```json
[
  {
    "name": "Sake Nigiri",
    "price": 10
  },
  {
    "name": "California Roll",
    "price": 12
  }
]

---

## Pruebas

### Ejecutar las pruebas
1. Asegúrate de que las dependencias estén instaladas.
   ```bash
   npm install
   ```

2. Ejecuta las pruebas con Jest:
   ```bash
   npm run test
   ```

---

## Manejo de errores

1. **Errores en el chatbot:**
   - Mensaje vacío: "Mensaje vacío."
   - Producto no encontrado: "No encontré el producto que mencionaste."

2. **Errores en el backend:**
   - Error en la base de datos: Respuesta con código 500 y mensaje de error.

---
