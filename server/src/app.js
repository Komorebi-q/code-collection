const Koa = require("koa");
const koaBody = require("koa-body");
const koaCompress = require("koa-compress");
const koaDocs = require("koa-docs");
const koaOnError = require("koa-onerror");
const koaHelmet = require("koa-helmet");
const koaJwt = require("koa-jwt");
const koaLogger = require("koa-logger");
const koaSession = require("koa-session");
const koaStatic = require("koa-session");
const koaCors = require("@koa/cors");
const router = require("./router/index.js");
const koaDb = require("./db/index.js");

const app = new Koa();

koaOnError(app);
koaDb(app);

app.keys = ["komorebi"];

app
  .use(koaHelmet())
  .use(koaSession({}, app))
  .use(koaBody())
  .use(koaCompress({ flush: require("zlib").Z_SYNC_FLUSH }))
  .use(koaCors())
  .use(router.routes())
  .use(router.allowedMethods());
// .use(
//   koaDocs.get("/docs", {
//     title: "komorebi Doc",
//     version: require("./../package.json").version,
//     theme: "simplex",
//     routerHandlers: "disabled",
//     groups: []
//   })
// )

module.exports = app;
