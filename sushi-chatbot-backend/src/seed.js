import mongoose from "mongoose";
import  Product from "./models/Product.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedMenu = async () => {
  const items = [
    { name: "California Roll", description: "Roll clásico", price: 1200, category: "Rolls" },
    { name: "Sake Nigiri", description: "Nigiri de salmón", price: 900, category: "Nigiri" },
    { name: "Coca-Cola", description: "Bebida refrescante", price: 500, category: "Bebidas" },
  ];

  await Product.insertMany(items);
  console.log("Datos cargados exitosamente.");
  mongoose.connection.close();
};

seedMenu();