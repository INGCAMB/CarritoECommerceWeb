# Carrito E-Commerce

Sistema completo de E-commerce con **Frontend en React** y **Backend en Node.js + Express**, que permite gestionar usuarios, productos, roles, autenticación y pagos (Stripe).

## 🚀 Tecnologías utilizadas

### **Frontend**
- React
- Axios
- React Router DOM
- Bootstrap
- React Icons
- React Toastify
- Chart.js + react-chartjs-2

### **Backend**
- Node.js
- Express
- MySQL2
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- multer
- Stripe

## 📦 Funcionalidades
- Creación, edición y eliminación de productos
- Gestión de usuarios (incluye roles como Administrador)
- Carrito de compras funcional
- API REST para comunicación con el servidor

## 📁 Estructura del proyecto
CARRITOECOMMERCE/
 ├── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── uploads/
    ├── server.js
    ├── .env
    └── package.json
 ├── frontend/
    ├── public/
    ├── src/
        ├── api/
        ├── components/
        ├── context/
        ├── pages/
        ├── index.js
        └── App.js
    ├── package.json
    └── README.md
md

# 📦 Instalación y ejecución

## 🗄️ Backend

### 1️⃣ Crear y entrar a la carpeta del backend
```bash
mkdir backend
cd backend
npm init -y
npm install express mysql2 dotenv cors bcryptjs jsonwebtoken stripe
npm install multer

node server.js //Ejecutar
```

## 🗄️ Frontend

### 2️⃣ Crear y entrar a la carpeta del frontend
```bash
npx create-react-app frontend
cd frontend
npm init -y
npm install axios react-router-dom bootstrap
npm install react-icons --save
npm install react-toastify
npm install chart.js react-chartjs-2
import 'bootstrap/dist/css/bootstrap.min.css'; //Obligatorio index.js
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //Obligatorio index.js
import "react-toastify/dist/ReactToastify.css"; //Obligatorio App.js

npm start //Ejecutar
```
#### Nota: Debes crear .env para las variables que se usan y puedes crear dos terminales y hacer funcionar una en backend y la otra para frontend para pruebas

## 👤 Autor
[ABSystems](https://github.com/ABSystems)
