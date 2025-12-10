const Order = require("../models/Order");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

exports.checkout = async (req, res) => {
  const { Total, items, paymentMethod } = req.body;

  try {

    /* //Crear pago con Stripe
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(Total * 100),
      currency: "usd",
      payment_method: paymentMethod,
      confirm: true
    }); */

    const idOrden = await Order.createOrder(req.usuarios.idUsuario, Total);

    for (const item of items) {
      await Order.addOrderItem(idOrden, item.idProducto, item.Cantidad, item.Precio);
    }

    res.json({ message: "Pago realizado", idOrden });

  } catch (err) {
    console.log("ERROR CHECKOUT:", err);
    res.status(400).json(err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.getOrdersByUser(req.usuarios.idUsuario);
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};