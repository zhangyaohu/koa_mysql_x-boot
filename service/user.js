const { query } = require('../utils/query');
const { 
	parseSort, 
	isEmpty, 
	isPassword,
	isEmail, 
	isName,
	isPhone
 } = require('../utils/utils');
//查询所有用户
const getAllUser = async (ctx, next, param) => {
	let sql = 'select count(*) as total from t_user';
	let total = await query(sql);
	let sort = parseSort(param.sort);
	let sql1 = `select * from t_user`
	if(sort.orderBy && sort.orderDirection) {
		sql1 += ` ORDER BY ${sort.orderBy} ${sort.orderDirection}`
	}if(param.pageIndex && param.pageSize) {
		sql += ` limit ${(param.pageIndex - 1) * param.pageSize} ${param.pageSize}`
	}
	let result  = await query(sql1);
	return ctx.body = {
		total:  total[0].total,
		status: '200',
		message: '成功',
		data: result
	}
}
//添加用户
const addUser =  (ctx, next, param) => {
	let requireProp = ['username', 'password', 'email', 'mobile', 'sex'];
	for(let prop in requireProp) {
		//校验用户以上属性不能为空
		if(isEmpty(param[requireProp[prop]])) {
			return ctx.body = {
				status: '200',
				message: requireProp[prop] === 'username' ? '用户名不能为空' : requireProp[prop] === 'password' ? '密码不能为空' : requireProp[prop] === 'email' ? "邮箱不能为空" : requireProp[prop] === 'phone'
				 ? "手机号不能为空" : "请选择性别",
				 data: []
			}
		}else{
			let message
			switch(requireProp[prop]) {
				case 'name': return message = validateName(param[requireProp[prop]]);
				case 'password': return message = validatePassword(param[requireProp[prop]]);
				case 'email': return message = validateEmail(param[requireProp[prop]]);
				case 'phone': return message =  validatePhone(param[requireProp[prop]]);
			}
			console.log(message);
			if(message) {
				return ctx.body = message;
			}else {
        return  ctx.body = add(ctx,param);
			}
		}
	}
}
//校验名称
let validateName = (param) => {
  if(!isName(param)) {
		return {
      status: '200',
			message: "用户名不合法",
			data: []
		}
	}
}
//校验密码
let validatePassword = (param) => {
  if(!isPassword(param)) {
		return {
      status: '200',
			message: "用户密码不合法",
			data: []
		}
	}
}
//校验邮箱
let validateEmail = (param) => {
  if(!isEmail(param)) {
		return {
      status: '200',
			message: "邮箱不合法",
			data: []
		}
	}
}
//校验手机号
let validatePhone = (param) => {
  if(!isPhone(param)) {
		return {
      status: '200',
			message: "手机号不合法",
			data: []
		}
	}
}
//添加用户sql
let add = async (ctx,param) => {
	let sql = 'insert into t_user (id,create_by, create_time, update_by, update_time, address, avatar, description,email, mobile, nick_name, password,sex, status, type, username, del_flag, department_id, street, pass_strength) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	let realParam = [];
	Object.keys(param).forEach( (name) => {
		realParam.push(param[name]);
	})
	console.log(sql);
	let result  = await query(sql, realParam);
	return ctx.body = {
		status: '200',
		message: '成功',
		data: result
	}
}
//删除用户包括批量删除，单个删除
const deleteUser = async (ctx, next, param) => {
	let sql = `DELETE FROM t_user WHERE id IN (${param.ids})`, result = {};
	result = await query(sql);
	return ctx.body = {
		status: '200',
		message: '成功',
		data: result
	}
}

//修改用户
const updateUser = async (ctx, next, param) => {
	let sql = `update t_user set `;
    if(param.username) {
			sql = sql + `username= '${param.username}',`
    }
    if(param.email) {
      sql = sql + `email= '${String(param.email)}',`;
      console.log(sql);
    }
    if(param.phone) {
			sql += `phone= '${param.email}',`
    }
    if(param.sex) {
			sql += `sex= '${param.sex}',`
    }
    if(param.avatar) {
			sql += `avatar= '${param.avatar}',`
    }
    if(param.department_id) {
			sql += `department_id= '${param.department_id}',`
    }
    if(param.type) {
			sql += `type= '${param.type}',`
    }
    if(sql.endsWith(',')) {
      sql = sql.slice(0, sql.length - 1);
    }
    console.log(sql);
		sql += ` where id = '${param.id}'`
		console.log(sql);
		result = await query(sql);
		return ctx.body = {
			status: '200',
			message: '成功',
			data: result
    }
}

module.exports = {
	GetAllUser: getAllUser,
	AddUser: addUser,
	DeleteUser: deleteUser,
	UpdateUser: updateUser
}