const { query } = require('../utils/query');
const fs = require('fs');
const path = require('path');
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
	if(param.username) {
		sql1 += ` where username='${param.username}'`
	}else if(!param.username && param.sex) {
		sql1 += ` where sex='${param.sex}'` 
	}else if(param.username && param.sex) {
    sql1 += ` and sex='${param.email}'` 
	}else if(!param.username && !param.sex && param.email) {
    sql1 += ` where email='${param.email}'` 
	}else if((param.username || param.sex) && param.email) {
    sql1 += ` and email='${param.email}'` 
	}else if(!param.username && !param.sex && !param.email && param.phone) {
    sql1 += ` where mobile='${param.phone}'` 
	}else if((param.username || param.sex || param.email) && param.phone) {
    sql1 += ` and mobile='${param.phone}'` 
	}else if((!param.username && !param.sex && !param.email && !param.phone) && param.status) {
    sql1 += ` where status='${param.status}'` 
	}else if((param.username || param.sex || param.email || param.phone) && param.status) {
    sql1 += ` and status='${param.status}'` 
	}else if((!param.username && !param.sex && !param.email && !param.phone && param.status) && param.type) {
    sql1 += ` where type='${param.phone}'` 
	}else if((param.username || param.sex || param.email || param.phone || param.status) && param.type) {
    sql1 += ` and type='${param.phone}'` 
	}else if((!param.username && !param.sex && !param.email && !param.phone && !param.status && !param.type) && param.start_time) {
    sql1 += ` where create_time='${param.start_time}'` 
	}else if((param.username || param.sex || param.email || param.phone || param.status || param.type) && param.start_time) {
    sql1 += ` and create_time='${param.start_time}'` 
	}else if((!param.username && !param.sex && !param.email && !param.phone && !param.status && !param.type && !param.start_time) && param.end_time) {
    sql1 += ` where create_time='${param.end_time}'` 
	}else if((param.username || param.sex || param.email || param.phone || param.status || param.type || param.start_time) && param.end_time) {
    sql1 += ` and '${param.end_time}'` 
	}
	if(sort && sort.orderBy && sort.orderDirection) {
		sql1 += ` ORDER BY ${sort.orderBy} ${sort.orderDirection}`
	}if(param.pageIndex && param.pageSize) {
		sql1 += ` limit ${(param.pageIndex - 1) * param.pageSize},${param.pageSize}`
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
	let sql = `DELETE FROM t_user WHERE id IN (?)`, result = {};
	console.log(param.ids.split(','));
	result = await query(sql, ...param.ids.split(','));
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
		sql += ` where id = '${param.id}'`
		result = await query(sql);
		return ctx.body = {
			status: '200',
			message: '成功',
			data: result
    }
}
//上传用户图片service
const uploadUser = (ctx, next, param) => {
	fs.exists('public/files', (exists) => {
     if(!exists) {
			 fs.mkdir('public/files', (err) => {
				 console.log('err');
			 })
		 }
	})
  const file = ctx.request.files.file;//获取上传文件
  const reader = fs.createReadStream(file.path);//创建可读流
  const ext = file.name.split('.').pop();//获取上传文件扩展名;
  const newFilename = new Date().getTime()+'-'+file.name.split('.')[0];
  const upStream = fs.createWriteStream(`public/files/${newFilename}.${ext}`);
  reader.pipe(upStream);
  return ctx.body = {
		status: '200',
		message: '成功',
		data:  path.resolve(`public/files/${newFilename}.${ext}`)
	};
}
//启用停用接口
const updateStatus = async (ctx, next, param) => {
	let sql = `update t_user set status = ? where id= ?`, result = {};
	result = await query(sql, [param.status, param.id]);
	return ctx.body = {
		status: '200',
		message: '成功',
		dasta:  result
	}
}

//修改密码
const updatePsw = async (ctx, next, param) => {
	let sql = `update t_user set password = ? where id = ?`, result = {};
	result = await query(sql, [param.password, param.id]);
	return ctx.body = {
		status: '200',
		message: '成功',
		dasta:  result
	}
}

module.exports = {
	GetAllUser: getAllUser,
	AddUser: addUser,
	DeleteUser: deleteUser,
	UpdateUser: updateUser,
	UploadUser: uploadUser,
	UpdateStatus: updateStatus,
	UpdatePsw: updatePsw
}