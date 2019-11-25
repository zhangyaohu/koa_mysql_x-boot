const userService = require('../service/user');

const getAllUserController = (ctx, next)  => {
	let reqParam = ctx.request.query;
	console.log(reqParam);
	return userService.GetAllUser(ctx, next, reqParam);
}

const addUserController = (ctx, next) => {
	let reqParam = ctx.request.body;
	return userService.AddUser(ctx, next, reqParam);
}

const deleteUserController = function(ctx, next) {
	let reqParam = ctx.request.query;
	return userService.DeleteUser(ctx, next, reqParam); 
}

const updateUserController = function(ctx, next) {
	let reqParam = ctx.request.body;
	console.log(reqParam);
	return userService.UpdateUser(ctx, next, reqParam);
}

module.exports = {
	GetAllUserController: getAllUserController,
	AddUserController: addUserController,
	DeleteUserController: deleteUserController,
	UpdateUserController: updateUserController
}