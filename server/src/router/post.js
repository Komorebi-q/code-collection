const Router = require("koa-router");
const router = new Router();

router.get("/juejin", async (ctx, next) => {
  try {
    const res = await ctx.dbModel.Post.find({
      from: "juejin"
    });
    console.log(res[0]);

    ctx.body = res;
  } catch (err) {
    throw err;
  }

  next();
});

module.exports = router;
