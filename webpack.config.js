const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,

  entry: './index.ts',

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ]
}
