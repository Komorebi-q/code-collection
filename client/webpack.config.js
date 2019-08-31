const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { GenerateSW, InjectManifest } = require("workbox-webpack-plugin");

const appPath = path.join(__dirname, "src");
const resolveApp = cur => path.join(appPath, cur);
const favicon = (module.exports = {
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
      },
      {
        include: path.resolve(__dirname, "./static"),
        test: /\.(png|jpe?g|gif|svg)$/
      }
    ]
  },
  resolve: {
    alias: {
      "@component": resolveApp("component"),
      "@page": resolveApp("page"),
      "@style": resolveApp("style")
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
    // open: true,
    inline: true
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "public/index.html")
    }),
    new FaviconsWebpackPlugin({
      logo: "./static/image/logo/favicons.png",
      inject: true,
      mode: "webapp",
      devMode: "webapp",
      favicons: {
        appName: "Komorebi",
        appDescription: "Komorebi utils",
        developerName: "Komorebi",
        developerURL: null,
        background_color: "#000000",
        theme_color: "#1890ff",
        icons: {},
        display: "standalone",
        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        yandex: true
      }
    }),
    new InjectManifest({
      swSrc: resolveApp("serviceWorker.js")
    })
  ]
});
