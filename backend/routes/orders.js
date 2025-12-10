const router = require('express').Router();
const auth = require('../middleware/auth');
const { checkout, getOrders } = require('../controllers/orderController');

router.post('/checkout', auth, checkout);
router.get('/', auth, getOrders);

module.exports = router;
