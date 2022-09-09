// nodejs 核心模块，用于操作文件路径
const path = require('path');


// npm install (或直接简写为`i`) some-plugin 
// 选项[--save] 用于Runtime使用的插件如lodash, 会把该依赖写入到package.json的dependencies模块
// 选项[--save-dev] 用于compile时的插件，如各种资源的压缩插件，写入到package.json的devDependencies模块


// 压缩构建后的css文件
// npm install css-minimizer-webpack-plugin --save-dev
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


// 自动生成 "dist/index.html" 插件地址：https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  // node项目入口，用于构筑项目依赖图 (dependency graph)
  entry: './src/index.js',
  //mode: 'production',
  mode: 'development',

  // 构建后的输出配置：默认为 "./dist/my-bundle.js"
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-bundle.js'
  },

  plugins: [
    // 根据配置在 "dist/" 生成html文件 
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // html文件标题
      title: '速通 webpack',
      // 相对路径为当前项目的根目录
      favicon: "src/assets/favicon.ico",
      // 是否压缩文件内容，默认为只在 production mode 才打开。生效后可通过 'chrome - 页面源代码' 查看效果。
      minify: true,
      // 在js/css文件后添加webpack编译版本号（以防浏览器使用旧版本的缓存）
      hash: true
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],

  module: {
    rules: [
      {
        // 相当于shell-script的test
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
      // {
      //   test: /\.css$/i,
      //   // style-loader 必须在 css-loader 之前
      //   use: ['style-loader', 'css-loader']
      // }
    ]
  },

  optimization: {
    // 是否启用压缩资源功能，默认只在 mode-production 时使用。该值配置为true可在mode-development使用
    minimize: true,
    // 指定压缩css所用的插件
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },

}
