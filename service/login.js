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
const verifyCodeService =  function () {
	let options = {
		size: 4,
		ignoreChars: '0o1l',
		noise: '2',
	}
	const cap = svgCaptcha.create(options);
	console.log(cap);
	return cap;
}

module.exports = {
	LoginService:  LoginService,
	VerifyCodeService: verifyCodeService
}