const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { Nombre, Email, Contra } = req.body;

  const hash = bcrypt.hashSync(Contra, 10);

  await User.create(Nombre, Email, hash, 0);

  res.json({ message: "Usuario registrado" });
};

exports.login = async (req, res) => {
  const { Email, Contra } = req.body;

  const user = await User.findByEmail(Email);

  if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

  const valid = bcrypt.compareSync(Contra, user.Contra);
  if (!valid) return res.status(400).json({ message: "Credenciales inválidas (contraseña)" });

  const token = jwt.sign(
    { idUsuario: user.idUsuario, Email: user.Email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.usuarios.idUsuario); // req.usuarios viene del auth middleware
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({
      idUsuario: user.idUsuario,
      Nombre: user.Nombre,
      Email: user.Email,
      isAdmin: user.isAdmin,
      CreadoAt: user.CreadoAt
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProfile = async (req, res) => {
  const { Nombre, Email, oldPassword, newPassword } = req.body;
  const userId = req.usuarios.idUsuario;

  try {
    const user = await User.findByIdAll(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const emailExists = await User.findByEmail(Email);

    if (emailExists && emailExists.idUsuario !== userId) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    let finalPassword = user.Contra;

    if (oldPassword && newPassword) {
      const validPass = await bcrypt.compare(oldPassword, user.Contra);

      if (!validPass) {
        return res.status(400).json({ message: "Contraseña actual incorrecta" });
      }

      finalPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedData = {
      Nombre,
      Email,
      Contra: finalPassword,
    };

    await User.updateProfile(userId, updatedData);

    res.json({ message: "Perfil actualizado correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};