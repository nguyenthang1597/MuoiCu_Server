const router = require('express').Router();
const Employee = require('../controllers/Employee');

router.get('/', Employee.getList);
router.get('/ma/:ma', Employee.getByMa);
router.post('/', Employee.add);
router.put('/ma/:ma', Employee.update);
router.delete('/ma/:ma', Employee.delete);


module.exports = router;