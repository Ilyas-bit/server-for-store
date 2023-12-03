const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Подключение к MongoDB Atlas
mongoose.connect(
  "mongodb+srv://qazwsxedc21012003:AJqsd5jyRdMuBzif@cluster0.lb9szyj.mongodb.net/store?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) =>
  console.error("Ошибка подключения к MongoDB:", error)
);
db.once("open", () => console.log("Успешное подключение к MongoDB"));

// Определение схемы для товаров
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

// Создание модели на основе схемы
const Product = mongoose.model("Product", productSchema);

// Добавление нескольких товаров при запуске программы
// const seedProducts = [
//   {
//     _id: ObjectId("656b8329eb86ecb5d065c8fb"),
//     name: "Пример товара 1",
//     category: "Пример категории 1",
//     price: 10,
//   },
//   { name: "Пример товара 2", category: "Пример категории 2", price: 20 },
//   { name: "Пример товара 3", category: "Пример категории 1", price: 15 },
// ];

// Product.insertMany(seedProducts)
//   .then((products) => {
//     console.log("Начальные товары успешно добавлены в коллекцию:", products);
//   })
//   .catch((error) => {
//     console.error("Ошибка при добавлении начальных товаров:", error);
//   });

// Получение списка всех товаров
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка сервера");
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
