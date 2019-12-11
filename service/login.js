const svgCaptcha = require('svg-captcha');
const {
  QUERY_TABLE,
  CREATE_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
	DELETE_TABLE,
	QUERY_SINGLE
} = require('../utils/sql')
const {query} = require('../utils/query')

//登录
const loginService = async function (ctx, next) {
	console.log(ctx.request.body)
	let bodyParam = ctx.request.body, emptyRegx = /^\s*$/;
		if(emptyRegx.test(bodyParam.username) || emptyRegx.test(bodyParam.password)) {
			return next().then(() => {
				ctx.body={
					'status': '400',
					'message': '用户名或密码错误',
					'data': '用户名或密码错误'
				}
			})
		}
		console.log('===' + ctx.cookies.get('captcha') + '||||||'+ bodyParam.verifyCode)
		if(ctx.cookies.get('captcha').toLowerCase() !== bodyParam.verifyCode.toLowerCase()) {
			return next().then(() => {
				ctx.body={
					'status': '400',
					'message': '验证码不正确',
					'data': '验证码不正确',
				}
			})
		}
	let sql = `SELECT * FROM t_user WHERE username=? and password=?`
	let result = {};
	  let  resp = await query(sql, [bodyParam.username, bodyParam.password])
		result = {
			'status': '200',
			'message': '成功',
			'data': resp
		}
		return ctx.body = result;
}
//或得验证码
<<<<<<< HEAD
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
=======
const verifyCodeService = async (ctx, next) => {
	var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
		size:4,    //验证码长度
		fontSize:50,   //字体大小
		width:100,
		height:32,
		background:'#f6f6f6'
	});
	next().then( () => {
		console.log(captcha)
		ctx.cookies.set('captcha', captcha.text);
		ctx.body = captcha.data;
		ctx.response.type = 'image/svg+xml';
	})
>>>>>>> d4a366d3161aadfe31a712f92e24624c1deab545
}

module.exports = {
	LoginService:  loginService,
	VerifyCodeService: verifyCodeService
}