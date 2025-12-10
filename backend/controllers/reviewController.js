const Review = require("../models/Review");

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.getReviews(req.params.idProducto);
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addReview = async (req, res) => {
  const { idProducto, Calificacion, Comentario } = req.body;

  try {
    await Review.create(idProducto, req.usuarios.idUsuario, Calificacion, Comentario);
    res.json({ message: "Reseña enviada" });
  } catch (err) {
    res.status(500).json(err);
  }
};
