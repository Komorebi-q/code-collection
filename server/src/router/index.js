const Router = require("koa-router");
const post = require("./post");
const collection = require("./collection");

const router = new Router();

router.options("*", ctx => {
  ctx.body = "allow access";
});

router.use("/post", post.routes(), post.allowedMethods());
router.use("/collection", collection.routes(), collection.allowedMethods());
module.exports = router;
