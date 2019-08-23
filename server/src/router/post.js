const Router = require("koa-router");
const router = new Router();

router.get("/juejin", async (ctx, next) => {
  try {
    ctx.body = await ctx.dbModel.Post.find();
  } catch (err) {
    throw err;
  }

  next();
});

module.exports = router;
