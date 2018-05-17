const { HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  entry: [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/'
  ],

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin()
  ],

  devServer: {
    hot: true,
    overlay: true,
    stats: 'minimal'
  },

  module: {
    rules: [
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
