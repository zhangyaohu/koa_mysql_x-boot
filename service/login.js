const svgCaptcha = require('svg-captcha');
const {
  QUERY_TABLE,
  CREATE_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
	DELETE_TABLE,
	QUERY_SINGLE
} = require('../utils/sql')

//登录
const LoginService = function () {
	let sql = `SELECT * FROM t_user WHERE username=? and password=?`
	return sql;
}
//或得验证码
const verifyCodeService =  async function (ctx, next) {
	let options = {
		size: 4,
		ignoreChars: '0o1l',
		noise: '2',
	}
	result  = await svgCaptcha.create(options);
	ctx.cookies.set('captcha', req.session); 
	ctx.headerSent('Content-Type', 'image/svg+xml');
	return ctx.body = result.data;
}

module.exports = {
	LoginService:  LoginService,
	VerifyCodeService: verifyCodeService
}