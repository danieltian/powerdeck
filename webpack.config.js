const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const eslintFormatterPretty = require('eslint-formatter-pretty')

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'inline-source-map',

  entry: [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],

  devServer: {
    hot: true,
    overlay: true,
    stats: 'errors-only'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        options: {
          formatter: eslintFormatterPretty
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-plain-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
}
