const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //Aceptar authorization en mayúsculas o minúsculas
  const token = req.headers["authorization"] || req.headers["Authorization"];

  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.usuarios = verified;
    next(); //Ya se verifico el token, ahora deja continuar hacia la siguiente función
  } catch (err) {
    console.log("Error verificando token:", err);
    res.status(400).json({ message: "Token inválido" });
  }
};