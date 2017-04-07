var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var dirname = path.resolve(__dirname, '../');
module.exports = {
  context: path.join(dirname),
  entry: path.resolve(dirname, "./src/js/root.js"),
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
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
        // loader: ExtractTextPlugin.extract("style-loader","css-loader") 
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        //小于8172b的将压缩成base64格式大于则保存至output下的path下的制定目录
        loader: 'url-loader?limit=8172&name=images/[name].[ext]'
      }
    ]
    
  },
  output: {
    path: path.resolve(dirname, './build'),
    filename: "js/bundle.js"
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename:'index.html',
        template:'src/index.html'
      }),
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