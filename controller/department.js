const parentmentSevice = require('../service/parentment');

const getParentController = function (ctx, next) {
	 let reqParam = ctx.request.path;
	 return parentmentSevice.GetParentService(ctx, next, reqParam);
} 

const  deleteParentController = function (ctx, next) {
	let reqParam = ctx.request.path;
	return parentmentSevice.DeleteParentService(ctx, next, reqParam);
}

const addController = function (ctx, next) {
	let reqParam = ctx.request.body;
	return parentmentSevice.AddService(ctx, next, reqParam);
}

const updateController = function (ctx, next) {
	let reqParam = ctx.request.body;
	return parentmentSevice.UpdateService(ctx, next, reqParam);
}

const getAllDepartmentController = async function (ctx, next) {
	let reqParam = ctx.request.query;
	return parentmentSevice.GetAllDepartmentService(ctx, next, reqParam);
}

module.exports = {
	GetParentController: getParentController,
	AddController: addController,
	DeleteParentController: deleteParentController,
	UpdateController: updateController,
	GetAllDepartmentController: getAllDepartmentController
}