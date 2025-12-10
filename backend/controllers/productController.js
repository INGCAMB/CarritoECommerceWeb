const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.getAllProducts();
  res.json(products);
};

exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const search = req.query.search || "";
  const minPrice = parseFloat(req.query.minPrice) || 0;
  const maxPrice = parseFloat(req.query.maxPrice) || 999999;

  const offset = (page - 1) * limit;

  try {
    const products = await Product.getProducts(search, minPrice, maxPrice, limit, offset);
    const total = await Product.countProducts(search, minPrice, maxPrice);

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProduct = async (req, res) => {
  const product = await Product.getById(req.params.idProducto);
  res.json(product);
};

exports.createProduct = async (req, res) => {
  //await Product.create(req.body);

  const { Nombre, Descripcion, Precio, Imagen: existingImage, Stock } = req.body;

  const Imagen = req.file ? "/uploads/productos/" + req.file.filename : existingImage || null;

  await Product.create({
    Nombre,
    Descripcion,
    Precio,
    Imagen,
    Stock
  });

  res.json({ message: "Producto creado" });
};

exports.updateProduct = async (req, res) => {
  //await Product.update(req.params.idProducto, req.body);

  const { Nombre, Descripcion, Precio, Imagen, Stock } = req.body;

  //Si suben una imagen nueva, reemplaza el valor
  let newImage = Imagen;

  if (req.file) {
    newImage = "/uploads/productos/" + req.file.filename;
  }

  const updated = await Product.update(req.params.idProducto, {
    Nombre,
    Descripcion,
    Precio,
    Imagen: newImage,
    Stock
  });

  if (!updated) {
    return res.status(404).json({
      ok: false,
      message: "No se pudo actualizar el producto"
    });
  }

  res.json({
    ok: true,
    message: "Producto actualizado",
    producto: updated
  });
};

exports.deleteProduct = async (req, res) => {
  await Product.delete(req.params.idProducto);
  res.json({ message: "Producto eliminado" });
};