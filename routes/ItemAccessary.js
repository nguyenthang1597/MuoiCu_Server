const router = require('express').Router();
const ItemAccessary = require('../controllers/ItemAccessary');

router.get('/', ItemAccessary.getList);
router.get('/ma/:ma', ItemAccessary.getByMa);
router.get('/maphutung/:maphutung', ItemAccessary.getByMa);
router.post('/', ItemAccessary.add);
router.put('/ma/:ma', ItemAccessary.update);
router.put('/maphutung/:maphutung', ItemAccessary.update);
router.delete('/ma/:ma', ItemAccessary.delete);
router.delete('/maphutung/:maphutung', ItemAccessary.delete);


module.exports = router;