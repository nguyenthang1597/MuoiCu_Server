const router = require('express').Router();
const ChamCong = require('../controllers/ChamCong');

router.get('/', ChamCong.getList);
router.get('/theongay', ChamCong.getByNgay);
router.get('/ma/:ma', ChamCong.getByMa);
router.post('/', ChamCong.add);
router.put('/ma/:ma', ChamCong.update);
router.delete('/ma/:ma', ChamCong.delete);

module.exports = router;