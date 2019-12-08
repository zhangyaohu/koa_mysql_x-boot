const router = require('koa-router')();

const loginController = require('../controller/login.js');

router.prefix('/logins');

router.post('/login', loginController.LoginController);
router.get('/verifyCode', loginController.VerifyCodeController);

module.exports = router