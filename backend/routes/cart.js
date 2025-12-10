const router = require('express').Router();
const auth = require('../middleware/auth');
const { addToCart, getCart, removeFromCart, decreaseFromCart, increaseInCart } = require('../controllers/cartController');

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.delete('/:idProducto', auth, removeFromCart);
router.put("/decrease/:idProducto", auth, decreaseFromCart);
router.put("/increase/:idProducto", auth, increaseInCart);

module.exports = router;
