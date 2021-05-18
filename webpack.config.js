const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,

  entry: './index.ts',

  devtool: process.env.NODE_ENV !== 'production' ? 'inline-source-map' : false,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ]
      },
      {
        test: /\.woff2$/i,
        use: 'url-loader',
      },
      {
        test: /\.svg$/i,
        use: {
          loader:'@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.EnvironmentPlugin([
      'ENABLE_FILE_SYSTEM_LOCAL_STORAGE',
    ]),
  ],

  performance: {
    hints: false,
  },
}
