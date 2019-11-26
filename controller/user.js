const userService = require('../service/user');

const getAllUserController = async (ctx, next)  => {
	let reqParam = ctx.request.query;
	return userService.GetAllUser(ctx, next, reqParam);
}

const addUserController = (ctx, next) => {
	let reqParam = ctx.request.body;
	return userService.AddUser(ctx, next, reqParam);
}

const deleteUserController = function (ctx, next) {
	let reqParam = ctx.request.query;
	return userService.DeleteUser(ctx, next, reqParam); 
}

const updateUserController =  async function (ctx, next) {
	let reqParam = ctx.request.body;
	return userService.UpdateUser(ctx, next, reqParam);
}

const uploadUserController = function (ctx, next) {
	let reqParam = ctx.request.body;
	return userService.UploadUser(ctx, next, reqParam);
}

module.exports = {
	GetAllUserController: getAllUserController,
	AddUserController: addUserController,
	DeleteUserController: deleteUserController,
	UpdateUserController: updateUserController,
	UploadUserController: uploadUserController,
}