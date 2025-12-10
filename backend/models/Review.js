const db = require("../config/db");

module.exports = {
  getReviews(idProducto) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT r.*, u.Nombre
        FROM resenas r
        JOIN usuarios u ON r.idUsuario = u.idUsuario
        WHERE r.idProducto = ?`,
        [idProducto],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },

  create(idProducto, idUsuario, Calificacion, Comentario) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO resenas (idProducto, idUsuario, Calificacion, Comentario) VALUES (?, ?, ?, ?)",
        [idProducto, idUsuario, Calificacion, Comentario],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
};
