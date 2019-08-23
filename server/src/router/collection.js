const Router = require("koa-router");

const router = new Router();

router.post("/add", async (ctx, next) => {
  const { id, type, alias = "", level = 0 } = ctx.request.body;
  let exist = false;

  console.log(id);

  switch (type) {
    case "post":
      exist = !!(await ctx.dbModel.Post.find({ _id: id })).length;
      await ctx.dbModel.Post.updateOne({ _id: id }, { collected: true });
      break;

    default:
      break;
  }

  if (exist) {
    await ctx.dbModel.Collection.insertMany([
      {
        collectionId: id,
        alias,
        level,
        type
      }
    ]);
  }

  ctx.body = {
    code: 0,
    data: {},
    message: "success"
  };
});

module.exports = router;
