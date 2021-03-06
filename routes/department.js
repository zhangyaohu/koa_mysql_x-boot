const router = require('koa-router')();
const departmentController = require('../controller/department');
router.prefix('/department')
//查询父级部门
router.get('/get-parent/:parent_id', departmentController.GetParentController);
//删除部门
router.delete('/delete', departmentController.DeleteParentController);
//添加部门
router.post('/add', departmentController.AddController);
//更新部门
router.put('/update', departmentController.UpdateController);
//查询父部门
router.get('/all', departmentController.GetAllDepartmentController);
//删除部门下的子部门
router.delete('/deletetree', departmentController.DeleteDepartmentTreeController)

module.exports = router