const router = require('express').Router();
const Statistic = require('../controllers/Statistic');

router.get('/bill', Statistic.getBill);
router.get('/employee', Statistic.getEmployee);

module.exports = router;