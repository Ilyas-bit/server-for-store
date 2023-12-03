const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

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

// Добавление нового товара
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка сервера");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
