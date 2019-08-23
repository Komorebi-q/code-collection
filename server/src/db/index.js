const mongoose = require("mongoose");
const conf = require("./../config/db");

module.exports = async app => {
  mongoose.connect(`${conf.url}/${conf.dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    author: String,
    date: Date,
    tag: String,
    like: Number,
    comment: Number,
    form: String,
    collected: Boolean
  });

  const collectionSchema = new mongoose.Schema({
    collectionId: String,
    alias: String,
    level: Number,
    type: String
  });

  const Post = mongoose.model("post", postSchema);
  const Collection = mongoose.model("collection", collectionSchema);

  app.context.dbModel = {};
  app.context.dbModel.Post = Post;
  app.context.dbModel.Collection = Collection;
};
