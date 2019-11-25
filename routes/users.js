const router = require('koa-router')()
const { query } = require('../utils/query')
const userController = require('../controller/user');
const fs = require('fs');
const path = require('path');

router.prefix('/users')

const {
  QUERY_TABLE,
  CREATE_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
} = require('../utils/sql')

//查询路由
router.get('/user', userController.GetAllUserController);
//添加路由
router.post('/add', userController.AddUserController)
//删除路由
router.delete('/user', userController.DeleteUserController);
//修改路由
router.put('/user',  userController.UpdateUserController);

router.post('/upload', (ctx, next) => {
  const file = ctx.request.files.file;//获取上传文件
 
  const reader = fs.createReadStream(file.path);//创建可读流

  const ext = file.name.split('.').pop();//获取上传文件扩展名;
  const newFilename = new Date().getTime()+'-'+file.name.split('.')[0];

  const upStream = fs.createWriteStream(`public/files/${newFilename}.${ext}`);

  reader.pipe(upStream);
  ctx.body = path.resolve(`public/files/${newFilename}.${ext}`);
})

module.exports = router
