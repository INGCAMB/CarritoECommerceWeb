const db = require("../config/db");

module.exports = {
  createOrder(idUsuario, Total) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO ordenes (idUsuario, Total, Estado) VALUES (?, ?, 'Pagado')",
        [idUsuario, Total],
        (err, result) => {
          if (err) reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  addOrderItem(idOrden, idProducto, Cantidad, Precio) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO ordenes_items (idOrden, idProducto, Cantidad, Precio) VALUES (?, ?, ?, ?)",
        [idOrden, idProducto, Cantidad, Precio],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  getOrdersByUser(idUsuario) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ordenes WHERE idUsuario = ?",
        [idUsuario],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },

  getTopSold() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          p.Nombre AS Nombre,
          SUM(oi.cantidad) AS Ventas
        FROM ordenes_items oi
        JOIN productos p ON oi.idProducto = p.idProducto
        GROUP BY oi.idProducto
        ORDER BY Ventas DESC
        LIMIT 5`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },

  //Cantidad de pedidos del mes
  countMonthlySales() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total
        FROM ordenes
        WHERE MONTH(CreadoAt) = MONTH(CURDATE())
        AND YEAR(CreadoAt) = YEAR(CURDATE())`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0].total);
        }
      );
    });
  },

  //Ganancia total del mes
  calculateMonthlyRevenue() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT SUM(total) AS total
        FROM ordenes
        WHERE MONTH(CreadoAt) = MONTH(CURDATE())
        AND YEAR(CreadoAt) = YEAR(CURDATE())`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0].total);
        }
      );
    });
  }
};
