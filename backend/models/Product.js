const db = require("../config/db");

module.exports = {
  getAllProducts() {
    return new Promise((resolve, reject) => {
      db.query("SELECT Nombre, Precio FROM productos", (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  getProducts(search, minPrice, maxPrice, limit, offset) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM productos
        WHERE Nombre LIKE ? AND Precio BETWEEN ? AND ?
        LIMIT ? OFFSET ?`,
        [`%${search}%`, minPrice, maxPrice, limit, offset],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },

  countProducts(search, minPrice, maxPrice) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM productos
        WHERE Nombre LIKE ? AND Precio BETWEEN ? AND ?`,
        [`%${search}%`, minPrice, maxPrice],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0].total);
        }
      );
    });
  },

  getById(idProducto) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM productos WHERE idProducto = ?", [idProducto], (err, rows) => {
        if (err) reject(err);
        resolve(rows[0]);
      });
    });
  },

  create(data) {
    const { Nombre, Descripcion, Precio, Imagen, Stock } = data;

    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO productos (Nombre, Descripcion, Precio, Imagen, Stock) VALUES (?, ?, ?, ?, ?)",
        [Nombre, Descripcion, Precio, Imagen, Stock],
        (err, result) => {
          if (err) reject(err); //Si hay error, la promesa se rechaza
          resolve(result); //Si no hay error, la promesa se resuelve con el resultado
        }
      );
    });
  },

  update(idProducto, data) {
    const { Nombre, Descripcion, Precio, Imagen, Stock } = data;

    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE productos SET Nombre = ?, Descripcion = ?, Precio = ?, Imagen = ?, Stock = ? WHERE idProducto = ?",
        [Nombre, Descripcion, Precio, Imagen, Stock, idProducto],
        (err, result) => {
          if (err) return reject(err);
          //resolve(result);

          //AHORA consultamos el producto actualizado
          db.query(
            "SELECT * FROM productos WHERE idProducto = ?",
            [idProducto],
            (err2, rows) => {
              if (err2) return reject(err2);
              resolve(rows[0]); //Devolvemos el producto actualizado
            }
          );
        }
      );
    });
  },

  delete(idProducto) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM productos WHERE idProducto = ?", [idProducto], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  //Contar todos los productos
  countAll() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total 
        FROM productos`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0].total);
        }
      );
    });
  },

  //Contar productos con bajo stock
  countLowStock() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total
        FROM productos
        WHERE Stock < 5`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0].total);
        }
      );
    });
  },

  //Top 5 productos más caros (para gráficas)
  getTopExpensive() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT Nombre, Precio 
        FROM productos 
        ORDER BY Precio DESC 
        LIMIT 5`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  },

  //Productos con menor stock (para gráficas)
  getLowStock() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT Nombre, Stock 
        FROM productos 
        ORDER BY Stock ASC 
        LIMIT 5`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
};
