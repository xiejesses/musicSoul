const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
var cors = require('koa2-cors');

app.use(cors());
// 跨域设置
// app.use(async ctx => {
//     if (ctx.path !== "/" && !ctx.path.includes(".")) {
//         ctx.header("Access-Control-Allow-Credentials", true);
//         // 这里获取 origin 请求头 而不是用 *
//         ctx.header("Access-Control-Allow-Origin", ctx.headers["origin"] || "*");
//         ctx.header("Access-Control-Allow-Headers", "X-Requested-With");
//         ctx.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//         ctx.header("Content-Type", "application/json;charset=utf-8");
//       }
//       next();
//   });
// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
