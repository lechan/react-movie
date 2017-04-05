var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./src/js/root.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'], //添加组件的插件配置
        }
      },
      //下面是使用 ant-design 的配置文件
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
    
  },
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  plugins: debug
           ? []
           : [
              new webpack.DefinePlugin({
                "process.env": { 
                   NODE_ENV: JSON.stringify("production") 
                 }
              }),
              new webpack.optimize.UglifyJsPlugin({
                output: {
                  comments: false,  // remove all comments
                },
                compress: {
                  warnings: false
                },
                mangle: false, 
                sourcemap: false
              }),
          ]
};