const webpack = require("webpack")
const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const BUILD_DIR = path.resolve(__dirname, "build")
const APP_DIR = path.resolve(__dirname, "src")

module.exports = {
  entry:     APP_DIR + "/index.js",
  output:    {
    path:       BUILD_DIR,
    filename:   "js/main.[hash:6].js",
    publicPath: "/",
  },
  module:    {
    rules: [
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:     {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use:  ["style-loader", { loader: "css-loader" }],
      },
      {
        test:    /\.(png|jpg|gif)$/,
        use:     "file-loader?name=images/img-[hash:6].[ext]&publicPath=/",
        exclude: /node_modules/,
      },
    ],
  },
  resolve:   {
    extensions: [".js", ".json", ".jsx"],
  },
  plugins:   [
    new HtmlWebPackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename:      "[name].[hash:6].css",
      chunkFilename: "[id].[hash:6].css",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        API_HOST: JSON.stringify(process.env.API_HOST || "http://localhost:8080/v1"),
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot:                true,
  },
  devtool:   "#eval-source-map",
}