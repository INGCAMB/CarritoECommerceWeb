const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');
const {
  getAllProducts,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/all', getAllProducts);
router.get('/', getProducts);
router.get('/:idProducto', getProduct);
//Single: necesario para que multer en tu backend pueda leer la imagen.
router.post('/', auth, admin, upload.single("Imagen"), createProduct);
router.put('/:idProducto', auth, admin, upload.single("Imagen"), updateProduct);
router.delete('/:idProducto', auth, admin, deleteProduct);

module.exports = router;
