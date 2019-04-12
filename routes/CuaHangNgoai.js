const router = require('express').Router();
const CuaHangNgoai = require('../controllers/CuaHangNgoai');

router.get('/', CuaHangNgoai.getList);
router.get('/ma/:ma', CuaHangNgoai.getByMa);
router.post('/', CuaHangNgoai.add);
router.put('/ma/:ma', CuaHangNgoai.update);
router.delete('/ma/:ma', CuaHangNgoai.delete);

module.exports = router;