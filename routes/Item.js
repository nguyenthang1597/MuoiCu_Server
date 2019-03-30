const router = require('express').Router();
const Item = require('../controllers/Item');

router.get('/', Item.getList);
router.get('/:ma', Item.getByMa);
router.get('/:maphutung', Item.getByMa);
router.post('/', Item.add);
router.put('/:ma', Item.update);
router.put('/:maphutung', Item.update);
router.delete('/:ma', Item.delete);
router.delete('/:maphutung', Item.delete);


module.exports = router;