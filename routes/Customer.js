const router = require('express').Router();
const Customer = require('../controllers/Customer');

router.get('/', Customer.getList);
router.get('/ma/:ma', Customer.getByMa);
router.post('/', Customer.add);
router.put('/ma/:ma', Customer.update);
router.delete('/ma/:ma', Customer.delete);


module.exports = router;