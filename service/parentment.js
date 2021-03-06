const { query } = require('../utils/query');
const  { genUniqueId, formatDate, isEmpty, parseSort} = require('../utils/utils');
//或得父部门
const  getParentService = async (ctx, next, param) => {
	let result = {}, sql = `select * from t_department where parent_id= ?`;
	result = await query(sql, ctx.params.parent_id);
	return ctx.body = {
		'status': '200',
		'message': '成功',
		'data': result
	}
}
//删除部门
const deleteParentService = async (ctx, next, param) => {
	let result = {}, sql = `delete  from t_department where  id in (?)`
	console.log(param.ids.split(','));
	result = await query(sql, ...param.ids.split(','));
	return ctx.body = {
		'status': '200',
		'message': '成功',
		'data': result
	}
}
//添加子部门
const addService = async (ctx, next, param) => {
	if(isEmpty(param.parent_id)) {
	 return	ctx.body = {
		 'status': '403',
		 'message': '上级部门不能为空',
		 'data': []
		}
	}
	if(isEmpty(param.sort_order)) {
		return	ctx.body = {
		 'status': '403',
		 'message': '排序值不能为空',
		 'data': []
		}
	}
	if(isEmpty(param.title)) {
		return	ctx.body = {
		 'status': '403',
		 'message': '名称不能为空',
		 'data': []
		}
	}
	let result = {}, sql = `insert into t_department (id, create_by, create_time, del_flag, update_by, update_time, parent_id,sort_order, status, title, is_parent) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	let values = [genUniqueId(), param.create_by, 
		formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'), param.del_flag, param.update_by, formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'), param.parent_id, param.sort_order, param.status,  param.title, param.is_parent]
	result = await query(sql, values);
	return ctx.body = {
		'status': '200',
		'message': '成功',
		'data': result
	}
} 

//修改部门
const updateService = async (ctx, next, param) => {
	let sql = `update t_department set `;
    if(param.update_by) {
			sql = sql + `create_by= '${param.update_by}',`
    }
    sql = sql + `update_time= '${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}',`;
    if(param.parent_id) {
			sql += `parent_id= '${param.parent_id}',`
    }
    if(param.sort_order) {
			sql += `sort_order= '${param.sort_order}',`
    }
    if(param.status) {
			sql += `status= '${param.status}',`
    }
    if(param.department_id) {
			sql += `department_id= '${param.department_id}',`
    }
    if(param.title) {
			sql += `title= '${param.title}',`
		}
		if(param.is_parent) {
			sql += `title= '${param.is_parent}',`
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

//查找部门
 const getAllDepartmentService = async (ctx, next,  param) => {
	let result = {}, sql = 'select count(*) as total from t_department';
	let total = await query(sql);
	let sort = parseSort(param.sort);
	let sql1 = `select * from t_department`
	if(param.title) {
		sql1 += ` where title='${param.title}'`
	}
	if(param.id && !param.title) {
		sql1 += ` where id='${param.id}'`
	}
	if(param.id && param.title) {
		sql1 += ` and id='${param.id}'`
	}
	if(sort && sort.orderBy && sort.orderDirection) {
		sql1 += ` ORDER BY ${sort.orderBy} ${sort.orderDirection}`
	}if(param.pageIndex && param.pageSize) {
		sql1 += ` limit ${(param.pageIndex - 1) * param.pageSize},${param.pageSize}`
	}
	result = await query(sql1);
	return ctx.body = {
		total:  total[0].total,
		status: '200',
		message: '成功',
		data: result
	}
 }

 const deleteDepartmentTreeService = async (ctx, next, param) => {
	 let result , sql = `select t_department.id from t_department where parent_id in (?)`;
	 console.log(param.ids.split(','));
	 result = await query(sql, ...param.ids.split(','));
	 console.log(result);
	 let childIds = result.map((it) => {
		 return it.id;
	 });
	childIds.push(...param.ids.split(','));
	let sql1 = `DELETE FROM t_department WHERE id IN (?)`;
	console.log(childIds)
	let result1 = await query(sql1, ...param.ids.split(','))
	return ctx.body = {
		status: '200',
		message: '成功',
		data: result1
	}
 } 
module.exports = {
	GetParentService: getParentService,
	AddService: addService,
	DeleteParentService: deleteParentService,
	UpdateService: updateService,
	GetAllDepartmentService: getAllDepartmentService,
	DeleteDepartmentTreeService: deleteDepartmentTreeService
}