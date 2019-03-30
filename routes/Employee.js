const router = require('express').Router();
const Employee = require('../controllers/Employee');

router.get('/', Employee.getList);
router.get('/:ma', Employee.getByMa);
// router.post('/', Employee.add);
router.put('/:ma', Employee.update);
// router.delete('/:ma', Customer.delete);


module.exports = router;