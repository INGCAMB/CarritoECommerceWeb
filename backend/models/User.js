const db = require("../config/db");

module.exports = {
  findByEmail(Email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuarios WHERE Email = ?",
        [Email],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0]);
        }
      );
    });
  },

  findById(idUsuario) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT idUsuario, Nombre, Email, isAdmin, CreadoAt FROM usuarios WHERE idUsuario = ?",
        [idUsuario],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0]);
        }
      );
    });
  },

  findByIdAll(idUsuario) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuarios WHERE idUsuario = ?",
        [idUsuario],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0]);
        }
      );
    });
  },

  getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM usuarios", (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  //Pero si no usas WHERE 1=1 tienes que ver si poner WHERE o AND.
  getUsers(search, role, createdAfter, createdBefore, limit, offset) {
    let sql = `SELECT * FROM usuarios WHERE 1=1`;
    let params = [];

    //BUSCAR POR NOMBRE O EMAIL
    if (search) {
      sql += ` AND (Nombre LIKE ? OR Email LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    //FILTRAR POR ROL
    if (role !== "") {
      sql += ` AND isAdmin = ?`;
      params.push(role);
    }

    //FECHA DESDE
    if (createdAfter) {
      sql += ` AND CreadoAt >= ?`;
      params.push(createdAfter + " 00:00:00");
    }

    //FECHA HASTA
    if (createdBefore) {
      sql += ` AND CreadoAt <= ?`;
      params.push(createdBefore + " 23:59:59");
    }

    sql += ` ORDER BY CreadoAt DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  countUsers(search, role, createdAfter, createdBefore) {
    let sql = `SELECT COUNT(*) AS total FROM usuarios WHERE 1=1`;
    let params = [];

    if (search) {
      sql += ` AND (Nombre LIKE ? OR Email LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (role !== "") {
      sql += ` AND isAdmin = ?`;
      params.push(role);
    }

    if (createdAfter) {
      sql += ` AND CreadoAt >= ?`;
      params.push(createdAfter + " 00:00:00");
    }

    if (createdBefore) {
      sql += ` AND CreadoAt <= ?`;
      params.push(createdBefore + " 23:59:59");
    }

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows[0].total);
      });
    });
  },

  getById(idUsuario) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM usuarios WHERE idUsuario = ?", [idUsuario], (err, rows) => {
        if (err) reject(err);
        resolve(rows[0]);
      });
    });
  },

  create(Nombre, Email, Contra, isAdmin) {
    //const { Nombre, Email, Contra, isAdmin } = data;

    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO usuarios (Nombre, Email, Contra, isAdmin) VALUES (?, ?, ?, ?)",
        [Nombre, Email, Contra, isAdmin],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  update(idUsuario, data) {
    //const { Nombre, Email, Contra, isAdmin, CreadoAt } = data;

    return new Promise((resolve, reject) => {
      db.query(
        //"UPDATE usuarios SET Nombre = ?, Email = ?, Contra = ?, isAdmin = ?, CreadoAt = ? WHERE idUsuario = ?",
        //[Nombre, Email, Contra, isAdmin, CreadoAt, idUsuario],
        "UPDATE usuarios SET ? WHERE idUsuario = ?",
        [data, idUsuario],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  delete(idUsuario) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM usuarios WHERE idUsuario = ?", [idUsuario], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  //Total usuarios
  countAll() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM usuarios`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0].total);
        }
      );
    });
  },

  //Total admins (role = 1)
  countAdmins() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total
        FROM usuarios
        WHERE isAdmin = 1`,
        (err, rows) => {
          if (err) reject(err);
          resolve(rows[0].total);
        }
      );
    });
  },

  updateProfile(idUsuario, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE usuarios SET ? WHERE idUsuario = ?",
        [data, idUsuario],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },
};
