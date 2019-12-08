const loginService = require('../service/login.js');
const { query } = require('../utils/query');
const crypto = require('crypto');


const loginController = (ctx, next) => {
	return loginService.LoginService(ctx, next);
}

let verifyCodeController = function (ctx, next) {
	 return loginService.VerifyCodeService(ctx, next);
}

module.exports = {
	LoginController: loginController,
	VerifyCodeController: verifyCodeController,
}