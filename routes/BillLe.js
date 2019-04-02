const router = require('express').Router();
const Bill = require('../controllers/BillLe');

router.get('/', Bill.getList);
router.get('/mahoadon/:mahoadon', Bill.getByMa);
router.post('/', Bill.add);
// router.put('/mahoadon/:mahoadon', Bill.update);
// router.delete('/mahoadon/:mahoadon', Bill.delete);


module.exports = router;