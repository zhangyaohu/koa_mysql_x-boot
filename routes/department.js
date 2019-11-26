const router = require('koa-router')();
const departmentController = require('../controller/department');
router.prefix('/department')

router.get('/get-parent/:parent_id', departmentController.GetParentController);
router.delete('/:id', departmentController.DeleteParentController);
router.post('/add', departmentController.AddController);
router.put('/update', departmentController.UpdateController)

module.exports = router