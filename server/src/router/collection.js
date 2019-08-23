const Router = require("koa-router");

const router = new Router();

router.post("/add", async (ctx, next) => {
  const { id, type, alias = "", level = 0 } = ctx.request.body;
  let exist = false;
  let collected = true;

  switch (type) {
    case "post":
      const post = await ctx.dbModel.Post.findOne({ _id: id });

      exist = !!post;

      if (exist) {
        collected = post.collected;
      }

      if (!collected && exist) {
        collected = await ctx.dbModel.Post.updateOne(
          { _id: id },
          { collected: true }
        );
      }

      break;

    default:
      break;
  }

  if (exist && !collected) {
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
