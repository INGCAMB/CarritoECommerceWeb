const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

//Solo admin puede acceder a todos los usuarios
router.get("/", getUsers);
//Obtener un usuario específico (puede ser admin o el mismo usuario)
router.get("/:idUsuario", getUser);
//Crear usuario (registro)
router.post("/", auth, admin, createUser);
//Actualizar usuario (solo admin o el mismo usuario)
router.put("/:idUsuario", auth, updateUser);
//Eliminar usuario (solo admin)
router.delete("/:idUsuario", auth, admin, deleteUser);

module.exports = router;