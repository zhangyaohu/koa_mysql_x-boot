const router = require('koa-router')()
const { query } = require('../utils/query')
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

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async function (ctx, next) {
  let bodyParam = ctx.request.body, emptyRegx = /^\s*$/;
  if(emptyRegx.test(bodyParam.name) || emptyRegx.test(bodyParam.password)) {
    ctx.body="用户名或者密码错误"
  }
  console.log(bodyParam);
  let sql = 'INSERT INTO user (user_name, user_phone) VALUES ("'+ bodyParam.name + '","'+ bodyParam.password+ '")';
  let result = {};
  await query(sql).then((resp) => {
    result = {
      'status': '200',
      'message': '成功'
    }
  });
  ctx.body = result;
})

router.get('/user', async (ctx, next) => {
  let result = {};
  await query(QUERY_TABLE('user')).then((resp) => {
    result = {
      'status': '200',
      'message': '成功',
      'data': resp
    }
  });
  ctx.body = result;
})

router.delete('/user', async (ctx, next) => {
  let result = {};
  await query(DELETE_TABLE('user', {primaryKey: 'user_id', primaryVal: ctx.query.user_Id}))
    .then((resp) => {
       result = {
         'status': '200',
         'message': '成功',
         'data': resp
       }
    })
    ctx.body = result;
})

router.delete('/users', async (ctx, next) => {
  let result = {};
  await query(`delete from user where user_id in (${ctx.query.user_Id})`)
  .then((resp) => {
    result = {
      'status': '200',
      'message': '成功',
      'data': resp
    }
 })
 ctx.body = result;;
})

router.post('/upload', (ctx, next) => {
  const file = ctx.request.files.file;//获取上传文件
 
  const reader = fs.createReadStream(file.path);//创建可读流

  const ext = file.name.split('.').pop();//获取上传文件扩展名;
  const newFilename = new Date().getTime()+'-'+file.name.split('.')[0];

  const upStream = fs.createWriteStream(`public/files/${newFilename}.${ext}`);

  reader.pipe(upStream);
  ctx.body = path.resolve(`public/files/${newFilename}.${ext}`);
})

router.put('/user', async (ctx, next) => {
  let result = {};
  console.log(ctx.request.body);
  await query('update user set user_name="' + ctx.request.body['user_name'] + `"where user_id="` + ctx.request.body['user_Id'] +'"')
  .then((resp) => {
    result = {
      'status': '200',
      'message': '成功',
      'data': resp
    }
 })
 ctx.body = result;;
})

module.exports = router
