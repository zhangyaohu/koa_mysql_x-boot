const router = require('koa-router')()
const userController = require('../controller/user');

router.prefix('/users')

//查询路由
router.get('/user', userController.GetAllUserController);
//添加路由
router.post('/add', userController.AddUserController)
//删除路由
router.delete('/user', userController.DeleteUserController);
//修改路由
router.put('/user',  userController.UpdateUserController);
//禁用路由
router.put('/user/status', userController.UpdateStatusController);
//上传用户图片
router.post('/upload', userController.UploadUserController);
//修改密码
router.put('/updatePsw', userController.UpdateUserPswController)

module.exports = router
