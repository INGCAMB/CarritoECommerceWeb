const express = require('express');
const path = require("path");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Permite que el frontend React use el backend
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

//Ruta para probar la conexión
app.get("/api/test", (req, res) => {
    res.json({ message: "Conexión exitosa con el backend!" });
});

//Routes importar
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const analyticRoutes = require('./routes/analytics');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

//Puerto desde .env o 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
