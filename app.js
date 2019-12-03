const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const error = require('koa-json-error')
const koaBody = require('koa-body');
const {  accessLogger,systemLogger, } = require('./config/logs.js');

const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/login')
const department = require('./routes/department')

// error handler
onerror(app)
app.use(error())

app.use(accessLogger(), systemLogger());

app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(department.routes(), department.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.message = ctx.message ? ctx.message : '成功'
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// logger
app.use(async (ctx, next) => {
     app.use(accessLogger()); //中间件
})
// error-handling
app.on('error', (err, ctx) => {
  logger.error(err);
  console.error('server error', err, ctx)
});

module.exports = app
