const router = require('koa-router')();

const loginController = require('../controller/login.js');


router.post('/login', loginController.LOGIN_CONTROLLER);
router.get('/verifyCode', loginController.VerifyCodeController);

module.exports = router