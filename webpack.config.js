// nodejs 核心模块，用于操作文件路径
const path = require('path');


// npm install (或直接简写为`i`) plugin1 plugin2 
// 选项[--save] 用于Runtime使用的插件如lodash, 会把该依赖写入到package.json的dependencies模块
// 选项[--save-dev] 用于compile时的插件，如各种资源的压缩插件，写入到package.json的devDependencies模块


// 压缩构建后的css文件
// npm install css-minimizer-webpack-plugin --save-dev
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


// 自动生成 "dist/index.html" 插件地址：https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  // 不少优化设置（如压缩文件体积）仅在 production mode 才会生效
  //mode: 'production',
  mode: 'development',

  // node项目入口，用于构筑项目依赖图 (dependency graph)
  // entry: './src/index.js',
  entry : {
    // 代码分离：提取不同entry之间共同引入的依赖
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    // print: './src/print.js',
    shared: 'lodash',
  },

  // 构建后的输出配置：默认为 "./dist/my-bundle.js"
  output: {
    // filename: 'my-bundle.js'
    // [name]对应的是上方的两个 entry ('index' & 'print')
    filename: '[name].bundle.js',
    // 指定output文件夹为 dist/
    path: path.resolve(__dirname, 'dist'),
    // 每次运行 npm run build 时清除 dist/
    clean: true,
  },

  // build 过程中所使用的插件，相关文档 - https://webpack.docschina.org/plugins/
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
      hash: true,
      // TODO trunks 属性的使用与 unit test.
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],

  // webpack 能处理 JavaScript 和 JSON 文件，但需要通过各种 loader 来处理其他类型的文件。
  // loader 的执行顺序为从右到左、从下到上（这也是官网文档提到的 loader 链会逆序执行的意思）
  // 如 use: ['style-loader', 'css-loader'], 执行顺序为 'css-loader' 先将 require() 引入的 css 文件
  // 进行解析，然后通过 style-loader 加载到 DOM 中。

  module: {
    rules: [
      {
        //（以.css结尾的文件名）相当于 shell script 的 test, 且必须注意作为正则匹配时，不能使用引号
        test: /\.css$/i,
        // MiniCssExtractPlugin 插件自带的loader
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },


// style-loader: 把 CSS 插入到 DOM 中，必须置于 css-loader 之前
// css-loader: 对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。

/**

      {
        test: /\.css$/i,
        // (官网的提示) 不要将 style-loader 与 mini-css-extract-plugin 一起使用。
        // use: ['style-loader', 'css-loader']
        // use 的参数，既可以是stringName, 也可以是对象（包含loader的options）
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'styleTag',
            },
          }, 
          {
            loader: 'css-loader',
            options: {
              // modules: true,
            }
          },
        ],
      }
 */


    ]
  },

  // 模块名映射（别名），可在需要导入的文件中通过别名进行导入
  resolve: {
    alias: {
      CSS: path.resolve(__dirname, 'src/css/'),
      JS: path.resolve(__dirname, 'src/js/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
    }
  },

  optimization: {
    // 是否启用压缩资源功能，默认只在 mode-production 时使用。该值配置为true可在mode-development使用
    minimize: true,
    // 指定压缩css所用的插件
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: 'single',
  },

}
