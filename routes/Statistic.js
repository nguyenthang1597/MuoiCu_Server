const router = require('express').Router();
const Statistic = require('../controllers/Statistic');

router.get('/bill', Statistic.getBill);
router.get('/employee', Statistic.getEmployee);
router.get('/chamcong/employee', Statistic.getBangCongEmployee);
router.get('/layfile/', Statistic.getTonKhoItem);


module.exports = router;