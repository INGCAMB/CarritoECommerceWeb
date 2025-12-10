const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.getCartByUser(req.usuarios.idUsuario);
    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addToCart = async (req, res) => {
  const { idProducto, Cantidad } = req.body;

  try {
    const existingItem = await Cart.findItem(req.usuarios.idUsuario, idProducto);

    if (existingItem) {
      await Cart.updateQuantity(existingItem.idCarritoItems, existingItem.Cantidad + Cantidad);
    } else {
      await Cart.addItem(req.usuarios.idUsuario, idProducto, Cantidad);
    }

    res.json({ message: "Producto añadido al carrito" });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await Cart.removeItem(req.usuarios.idUsuario, req.params.idProducto);
    res.json({ message: "Producto eliminado del carrito" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.decreaseFromCart = async (req, res) => {
  const idProducto = req.params.idProducto;

  try {
    const item = await Cart.findItem(req.usuarios.idUsuario, idProducto);

    if (!item) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    if (item.Cantidad > 1) {
      await Cart.decreaseQuantity(item.idCarritoItems, item.Cantidad - 1);
    } else {
      await Cart.removeItem(req.usuarios.idUsuario, idProducto);
    }

    res.json({ message: "Cantidad actualizada" });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.increaseInCart = async (req, res) => {
  const idProducto = req.params.idProducto;

  try {
    const item = await Cart.findItem(req.usuarios.idUsuario, idProducto);

    if (!item) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    await Cart.increaseInCart(item.idCarritoItems, item.Cantidad + 1);

    res.json({ message: "Cantidad actualizada" });

  } catch (err) {
    res.status(500).json(err);
  }
};
