const router = require('express').Router();
const auth = require('../middleware/auth');
const { addReview, getProductReviews } = require('../controllers/reviewController');

router.get('/:idProducto', getProductReviews);
router.post('/', auth, addReview);

module.exports = router;
