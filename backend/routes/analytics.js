const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { 
    getDashboardKPIs,
    getTopExpensive, 
    getTopSold, 
    getLowStock
} = require('../controllers/analyticsController');

router.get("/kpi", auth, admin, getDashboardKPIs);
router.get("/top-expensive", auth, admin, getTopExpensive);
router.get("/top-sold", auth, admin, getTopSold);
router.get("/low-stock", auth, admin, getLowStock);

module.exports = router;