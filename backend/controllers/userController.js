const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers(); //User.getAllUsers es el método que debes crear en tu modelo
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Obtener todos los usuarios filtrados
exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const search = req.query.search || "";
  const role = req.query.role || "";
  const createdAfter = req.query.createdAfter || "";
  const createdBefore = req.query.createdBefore || "";

  const offset = (page - 1) * limit;

  try {
    const users = await User.getUsers(search, role, createdAfter, createdBefore, limit, offset);
    const total = await User.countUsers(search, role, createdAfter, createdBefore);

    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Obtener un usuario por idUsuario
exports.getUser = async (req, res) => {
  try {
    const user = await User.getById(req.params.idUsuario);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Crear usuario (registro)
exports.createUser = async (req, res) => {
  try {
    const { Nombre, Email, Contra, isAdmin } = req.body;
    
    const hash = bcrypt.hashSync(Contra, 10);
    
    await User.create(Nombre, Email, hash, isAdmin);
    res.json({ message: "Usuario creado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { Nombre, Email, Contra, isAdmin, CreadoAt } = req.body;
    
    const updatedData = { Nombre, Email, isAdmin, CreadoAt };
    
    if (Contra && Contra.trim() !== "") {
      updatedData.Contra = await bcrypt.hash(Contra, 10);
    }

    await User.update(req.params.idUsuario, updatedData);

    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.idUsuario);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
