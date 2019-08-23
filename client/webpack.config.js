const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appPath = path.join(__dirname, "src");
const resolveApp = cur => path.join(appPath, cur);

module.exports = {
  entry: [resolveApp("index.jsx")],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.[name].[hash:6].js",
    chunkFilename: "[name].chunk.[hash:6].js"
  },
  module: {
    rules: [
      {
        include: appPath,
        test: /\.(js|jsx)$/,
        loader: "babel-loader"
      },
      {
        include: appPath,
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      "@component": resolveApp("component"),
      "@page": resolveApp("page")
    },
    extensions: [".jsx", ".js", ".json", ".scss", ".html"]
  },
  devServer: {
    port: 8000,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    // host: "0.0.0.0",
    hot: true,
    open: true,
    inline: true
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html")
    })
  ]
};
