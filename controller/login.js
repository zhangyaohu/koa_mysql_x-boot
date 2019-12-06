const loginService = require('../service/login.js');
const { query } = require('../utils/query');
const crypto = require('crypto');


const loginController = async (ctx, next) => {
		let bodyParam = ctx.request.body, emptyRegx = /^\s*$/;
		if(emptyRegx.test(bodyParam.name) || emptyRegx.test(bodyParam.password)) {
			return this.body="用户名或者密码错误"
		}
		let sql = loginService.LoginService(bodyParam);
		let result = {};
		console.log(crypto.createHmac('sha256', bodyParam.password).digest('hex'));
		await query(sql, [bodyParam.name, bodyParam.password]).then((resp) => {
			result = {
				'status': '200',
				'message': '成功',
				'data': resp
			}
		});
		return ctx.body = result;
}

let verifyCodeController = function (ctx, next) {
	 return loginService.VerifyCodeService(ctx, next);
}

module.exports = {
	LOGIN_CONTROLLER: loginController,
	VerifyCodeController: verifyCodeController,
}