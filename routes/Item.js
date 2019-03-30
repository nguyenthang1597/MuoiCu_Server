const router = require('express').Router();
const Item = require('../controllers/Item');

router.get('/', Item.getList);
router.get('/ma/:ma', Item.getByMa);
router.get('/maphutung/:maphutung', Item.getByMa);
router.post('/', Item.add);
router.put('/ma/:ma', Item.update);
router.put('/maphutung/:maphutung', Item.update);
router.delete('/ma/:ma', Item.delete);
router.delete('/maphutung/:maphutung', Item.delete);


module.exports = router;