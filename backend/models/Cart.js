const db = require("../config/db");

module.exports = {
  getCartByUser(idUsuario) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT c.idCarritoItems, c.idProducto, c.Cantidad, p.Nombre, p.Precio, p.Imagen 
        FROM carrito_items c
        JOIN productos p ON c.idProducto = p.idProducto
        WHERE c.idUsuario = ?`,
        [idUsuario],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },

  findItem(idUsuario, idProducto) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM carrito_items WHERE idUsuario = ? AND idProducto = ?",
        [idUsuario, idProducto],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0]);
        }
      );
    });
  },

  addItem(idUsuario, idProducto, quantity) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO carrito_items (idUsuario, idProducto, Cantidad) VALUES (?, ?, ?)",
        [idUsuario, idProducto, quantity],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  decreaseQuantity(idCarritoItems, Cantidad) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE carrito_items SET Cantidad = ? WHERE idCarritoItems = ?",
        [Cantidad, idCarritoItems],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  removeItem(idUsuario, idProducto) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM carrito_items WHERE idUsuario = ? AND idProducto = ?",
        [idUsuario, idProducto],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  increaseInCart(idCarritoItems, Cantidad) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE carrito_items SET Cantidad = ? WHERE idCarritoItems = ?",
        [Cantidad, idCarritoItems],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
