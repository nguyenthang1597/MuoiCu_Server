const router = require('express').Router();
const ItemPart = require('../controllers/ItemPart');

router.get('/', ItemPart.getList);
router.get('/ma/:ma', ItemPart.getByMa);
router.get('/maphutung/:maphutung', ItemPart.getByMa);
router.post('/', ItemPart.add);
router.put('/ma/:ma', ItemPart.update);
router.put('/maphutung/:maphutung', ItemPart.update);
router.delete('/ma/:ma', ItemPart.delete);
router.delete('/maphutung/:maphutung', ItemPart.delete);
router.post('/import/', ItemPart.addMutil);


module.exports = router;